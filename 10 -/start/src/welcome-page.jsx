
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
    return (
        <div style={divStyle}>
            <h1 style={textStyle}>Welcome back!</h1>
            <h3 style={textStyle}>(go get those tasks!)</h3>
        </div>
    );
}