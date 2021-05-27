import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useUserContext } from './user-context';

const StyledButton = styled('button')`
    float: right;
    display: inline-block;
    font-size: 22px;
    padding: 10px;
    border-radius: 10px;
    color: black;
    background-color: lightGray;
    border: none;

    &:hover {
        background-color: white;
    }

    &:active {
        background-color: gray;
    }
`;

const StyledNavLink = styled(NavLink).attrs({ activeClassName: 'selected'})`
    &:link, &:visited, &:hover, &:active {
        display: inline-block;
        text-decoration-line: none;
        font-size: 22px;
        padding: 10px;
        border-radius: 10px;
        margin: 0 5px 0 0;
        color: black;
        background-color: rgba(255,255,255,0);
        transition: background-color 400ms;

        &.${({activeClassName}) => activeClassName} {
            background-color: rgba(255,255,255,1);
            transition: background-color 400ms;
        }
    }
`;

const navStyle = {
    margin: '5px 0',
    padding: '10px',
    backgroundColor: 'lightGray'
};

export const Navigation = () => {
    const { activeUser, logout } = useUserContext();

    const onClick = (event) => {
        logout();
    }

    return (
        <nav style={navStyle}>
            <StyledNavLink exact to='/'>Home</StyledNavLink>
            <StyledNavLink to='/todos'>Todos</StyledNavLink>
            {activeUser !== null ? <StyledButton onClick={onClick}>Logout</StyledButton> : null}
        </nav>
    )

    
}