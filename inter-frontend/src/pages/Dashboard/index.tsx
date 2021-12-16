import { useEffect, useState } from 'react';
import {useAuth} from '../../hooks/useAuth';
import { DashboardBackground, BodyContainer, InLineTitle, InLineContainer } from './styles';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Statement } from './Statement';
import { pay, request } from '../../services/resources/pix'

export const Dashboard = () => {

    const {user, getCurrentUser} = useAuth();
    const wallet = user?.wallet || 0;

    const [ key, setKey ] = useState('');
    const [ generatedKey, setGeneratedKey ] = useState('');
    const [ newVale, setNewVale ] = useState('');

    const handleNewPayment = async () => { 
        const {data} = await request(Number(newVale));
        if(data.copyPasteKey) {
            setGeneratedKey(data.copyPasteKey)
        }
    }

    const handlePayPix = async () => {
        try { 
            const {data} = await pay(key)
            if (data.msg) {
                alert(data.msg);
                return;
            }
        } catch (e){
            console.log(e);
            alert('Não é possivel receber o PIX no mesmo usuário')
        }
    }

    useEffect(() => {
        getCurrentUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!user) {
        return null;
    }

    return (
        <DashboardBackground>
            <Header />
            <BodyContainer>
                <div>
                    <Card noShadow width="90%">
                        <InLineTitle>
                            <h2 className="h2"> Saldo Atual</h2>    
                        </InLineTitle>
                        <InLineContainer>
                            <h3 className="wallet">
                                {wallet.toLocaleString(
                                'pt-BR', { style: 'currency', currency: 'BRL'}
                                )}
                            </h3>
                        </InLineContainer>               
                    </Card>
                    <Card noShadow width="90%">
                        <InLineTitle>
                            <h2 className="h2"> Receber PIX</h2>    
                        </InLineTitle>
                        <InLineContainer>
                            <Input value={newVale} onChange={e => setNewVale(e.target.value)} style={{flex: 1}} placeholder="VALOR" />
                            <Button onClick={handleNewPayment} >
                                Gerar Código
                            </Button>
                        </InLineContainer>

                    { generatedKey && (
                        <>
                            <p className="primary-color">PIX copia e cola</p>               
                            <p className="primary-color">{generatedKey}</p>
                        </>               
                    )}
                        </Card>
                    <Card noShadow width="90%">
                        <InLineTitle>
                            <h2 className="h2"> Enviar PIX</h2>    
                        </InLineTitle>
                        <InLineContainer>
                            <Input style={{flex: 1}} value={key} onChange={e => setKey(e.target.value)} placeholder="Insira a chave PIX" />
                            <Button onClick={handlePayPix}> 
                                Pagar PIX
                            </Button>
                        </InLineContainer>               
                    </Card>
                </div>
                <div>
                    <Card noShadow width="90%">
                        <InLineTitle>
                            <h2 className="h2"> Extrato da Conta</h2>    
                        </InLineTitle>
                        <Statement />
                    </Card>
                </div>
            </BodyContainer>
        </DashboardBackground>
    )
}
