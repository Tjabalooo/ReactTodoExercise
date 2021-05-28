import React from 'react';

export class ErrorBoundary extends React.Component {
    state = { error: null };

    static getDerivedStateFromError(error) {
        return { error: error };
    }

    render = () => {
        return this.props.children(this.state.error);
    }
}