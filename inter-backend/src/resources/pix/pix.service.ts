import { getRepository } from 'typeorm';
import { encodeKey, decodeKey } from '../../utils/pix';

import { User } from '../../entity/User';
import { Pix } from '../../entity/Pix';
import AppError from '../../shared/error/AppError';

export default class PixService {

    async request( value: number, user: Partial<User>) {
        const pixRepository = getRepository(Pix);

        const userRepository = getRepository(User);
        const currentUser = await userRepository.findOne({where: {id: user.id}})

        const requestData = {
            requestingUser: currentUser,
            value,
            status: 'open',
        }

        const register = await pixRepository.save(requestData);
        const key = encodeKey(user.id || '', value, register.id);
        return key
    }

    async pay( key: string, user: Partial<User>) {
        const KeyDecoded = decodeKey(key);

        if (KeyDecoded.userId === user.id) {
            throw new AppError("Não é possivel receber o PIX do mesmo usuário", 401)
        }

        const pixRepository = getRepository(Pix);
        const userRepository = getRepository(User);

        const requestingUser = await userRepository.findOne({where: {id: KeyDecoded.userId}})
        const payingUser = await userRepository.findOne({where: {id: user.id}})

        if (payingUser?.wallet && payingUser.wallet < Number(KeyDecoded.value)) {
            throw new AppError("Não há saldo suficiente para fazer o pagamento", 401)
        }

        if (!requestingUser || !payingUser) {
            throw new AppError("Não encontramos os cliente da transação, gereuma nova chave", 401)
        }

        requestingUser.wallet = Number(requestingUser?.wallet) + Number(KeyDecoded.value);
        await userRepository.save(requestingUser)

        payingUser.wallet = Number(payingUser?.wallet) - Number(KeyDecoded.value);
        await userRepository.save(payingUser)

        const pixTransaction = await pixRepository.findOne({where: {id: KeyDecoded.registerId, status: 'open'}})

        if (!pixTransaction) { 
            throw new AppError("Chave inválida para pagamento", 401)
        }

        pixTransaction.status = 'close';
        pixTransaction.payingUser = payingUser

        await pixRepository.save(pixTransaction)

        return {msg: 'Pagamento efetuado com sucesso' }
    }

    async transactions( user: Partial<User>) {
        const pixRepository = getRepository(Pix);

        const pixReceived = await (await pixRepository.find({where: {requestingUser: user.id, status: 'close'}, relations: ['payingUser']}))

        const pixPaying = await pixRepository.find({where: {payingUser: user.id, status: 'close'}, relations: ['requestingUser']})

        const received = pixReceived.map(transaction => ({
            value: transaction.value,
            user: {
                firstname: transaction.payingUser.firstName,
                lastname: transaction.payingUser.lastName,
            },
            updateAt: transaction.updateAd,
            type: 'received'
        }));

        const paying = pixPaying.map(transaction => ({
            value: transaction.value,
            user: {
                firstname: transaction.requestingUser.firstName,
                lastname: transaction.requestingUser.lastName,
            },
            updateAt: transaction.updateAd,
            type: 'paid'
        }));

        const allTransactions = received.concat(paying);

        allTransactions.sort(function (a,b) {
            const dateA = new Date(a.updateAt).getTime();
            const dateB = new Date(b.updateAt).getTime();
            return dateA < dateB ? 1 : -1;
        });

        return allTransactions
    }
}