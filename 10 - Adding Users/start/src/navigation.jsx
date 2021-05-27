import styled from 'styled-components';
import { NavLink } from 'react-router-dom';



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
    return (
        <nav style={navStyle}>
            <StyledNavLink exact to='/'>Home</StyledNavLink>
            <StyledNavLink to='/todos'>Todos</StyledNavLink>
        </nav>
    )
}