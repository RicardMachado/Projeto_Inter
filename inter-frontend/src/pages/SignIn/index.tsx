import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Wrapper, Background, InputContainer, ButtonContainer } from './styles';
import Card from '../../components/Card'


import background from '../../assets/background-login.jpg';
import logoInter from '../../assets/logoInter.png'
import Input from '../../components/Input';
import Button from '../../components/Button';

import {useAuth} from '../../hooks/useAuth';

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const {userSignIn} = useAuth(); 

    const handToSignIn = async () => {
        const data = {
           email,
           password 
        }
        const response = await userSignIn(data);

        if (response.id) {
            navigate('/dashboard');
            return;
        }

        alert('Usuário ou senha inválida')
    }

    return (
        <Wrapper>
            <Background image={background}/>
            <Card width="403px">
                <img src={logoInter} width={172} height={61} alt="logo inter" />

                <InputContainer>
                    <Input 
                        placeholder="E-MAIL" 
                        name="email" 
                        type="email"
                        value={email}
                        onChange={ e => setEmail(e.target.value) } 
                    />
                    <Input 
                        placeholder="SENHA" 
                        name="password" 
                        type="password"
                        value={password}
                        onChange={ e => setPassword(e.target.value) }  
                    />
                </InputContainer>

                <ButtonContainer>
                    <Button type="button" onClick={handToSignIn}>
                        ENTRAR
                    </Button>
                    <p>Ainda não é cadastrado? <Link to="/signup"> Cadastre-se Já!</Link> </p>
                </ButtonContainer>
            </Card>
        </Wrapper>
    )
}

export default SignIn;