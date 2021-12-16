import { Container, StatementItemImage, StatementItemInfo } from './styles';
import { format } from 'date-fns';
import { FiDollarSign } from 'react-icons/fi'

interface statementItem {
		value: number,
		user: {
			firstname: string,
			lastname: string,
		},
        type: 'paid' | 'received',
	    updateAt: Date,
}

export const StatementItem = ( { user, value, type, updateAt }: statementItem) => {

    return (
        <Container>
            <StatementItemImage type={type}>
                <FiDollarSign size={24} />
            </StatementItemImage>
            <StatementItemInfo>
                <p className='primary-color'>{value.toLocaleString('pt-BR', { style: 'currency', currency: "BRL" })}</p>
                <p> {type === 'paid' ? 'Pago a ' : "Recebido de "}
                    <strong>{user.firstname} {user.lastname}</strong>
                </p>
                <p>{format(new Date(updateAt), "dd/MM/yyyy 'ás' HH:mm 'h'")}</p>
            </StatementItemInfo>
        </Container>
    );
}