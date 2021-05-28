import { useUserContext } from './user-context';

const divStyle = {
    width: '60%',
    margin: '0 auto',
    padding: '40px',
    backgroundColor: 'white',
    borderRadius: '10px'
};

const textStyle = {
    textAlign: 'center'
}

export const WelcomePage = () => {
    const { activeUser } = useUserContext();

    return (
        <div style={divStyle}>
            <h1 style={textStyle}>Welcome back {activeUser.name}!</h1>
            <h3 style={textStyle}>(go get those tasks!)</h3>
        </div>
    );
}