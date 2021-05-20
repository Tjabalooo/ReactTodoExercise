import React from 'react';

export class Hello extends React.Component {
    render = () => {

        const {name, hidden=false} = this.props;

        return hidden ? null : <h1>{`Hello ${name}`}</h1>;
    }
}