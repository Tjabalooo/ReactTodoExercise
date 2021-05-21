import { useState } from 'react';

const inputStyle = {
    width: '100%',
    backgroundColor: '#FFF',
    padding: 16,
    fontSize: 24,
    fontStyle: 'italic',
    fontWeight: 300,
    border: 'none'
};

export const TodoForm = ({createTodo}) => {

    const [title, setTitle] = useState('');

    const textChanged = (event) => {
        setTitle(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (title !== "") {
            createTodo(title);
            setTitle('');
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <input style={inputStyle} onChange={textChanged} value={title} placeholder="What do you need to do?"/>
        </form>
    );
};