import { useState } from 'react'

import { Wrapper, Background, InputContainer, ButtonContainer } from './styles';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/Card'

import background from '../../assets/background-login.jpg';
import logoInter from '../../assets/logoInter.png'
import Input from '../../components/Input';
import Button from '../../components/Button';

import {useAuth} from '../../hooks/useAuth';

const SignUp = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();

    const {userSignUp} = useAuth(); 

    const handToSignUp = async () => {

        const data = {
            firstName,
            lastName,
            email,
            password 
        }

        userSignUp(data);
        
        navigate('/dashboard');
    }

    return (
        <Wrapper>
            <Background image={background}/>
            <Card width="403px">
                <img src={logoInter} width={172} height={61} alt="logo inter" />

                <InputContainer>
                    <Input 
                        placeholder="PRIMEIRO NOME" 
                        name="firstName" 
                        type="text"
                        value={firstName}
                        onChange={ e => setFirstName(e.target.value) } 
                    />
                    <Input 
                        placeholder="SOBRENOME" 
                        name="lastName" 
                        type="text"
                        value={lastName}
                        onChange={ e => setLastName(e.target.value) } 
                    />
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
                   { /*
                    <Input 
                        placeholder="CONFIRME SENHA" 
                        name="conf_password" 
                        type="password" 
                    />*/}
                </InputContainer>

                <ButtonContainer>
                    <Button type="button" onClick={handToSignUp}>
                        CADASTRAR
                    </Button>
                    <p>Já tem uma conta? <Link to="/"> Entre Já!</Link> </p>
                </ButtonContainer>
            </Card>
        </Wrapper>
    )
}

export default SignUp; 