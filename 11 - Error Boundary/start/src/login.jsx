import { useState } from 'react';
import { useUserContext } from './user-context';
import { Redirect, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const LoginBase = ({onSubmit, name, onChange, className}) => {
    return (
        <form className={className} onSubmit={onSubmit}>
            <label htmlFor='name'>Name: </label>
            <input id='name' type='text' autoComplete='off' value={name} onChange={onChange}></input>
            <div>
                <input type='submit' value='Login'></input>
            </div>
            <h3>Invalid user!</h3>
        </form>
    );
};

const StyledLogin = styled(LoginBase)`
    background-color: darkGray;
    padding: 20px;

    & label {
        display: block;
        width: 60%;
        text-align: left;
        margin: 0 auto 10px;
        font-size: 24px;
    }

    & input[type='text'] {
        display: block;
        width: 60%;
        margin: 0 auto;
        background-color: #FFF;
        padding: 16px;
        border: none;
        border-radius: 10px;
        font-size: 24px;
        font-weight: 300;

        &:focus {
            outline-width: 0;
        }
    }

    & div {
        display: block;
        margin: 10px auto 0;
        width: 60%;

        & input[type='submit'] {
            padding: 10px;
            width: 120px;
            border-radius: 10px;
            border: none;
            font-size: 24px;
            font-weight: 300;
            background-color: white;

            &:hover {
                background-color: lightGray;
            }

            &:active {
                background-color: gray;
            }
        }
    }

    & h3 {
        visibility: ${({loginFailed}) => loginFailed ? 'visible' : 'hidden'};
        display: block;
        width: 60%;
        color: darkRed;
        margin 10px auto 0;
        text-align: left;
    }
`;

export const Login = () => {
    const location = useLocation();
    const [name, setName] = useState('');
    const { activeUser, login, loginFailed } = useUserContext();

    const onChange = (event) => {
        setName(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (activeUser === null) {
            login(name);
        }
    };

    if (activeUser !== null) {        
        return <Redirect to={location.state?.from ?? '/'} />
    }

    return <StyledLogin onSubmit={onSubmit} name={name} onChange={onChange} loginFailed={loginFailed} />
};