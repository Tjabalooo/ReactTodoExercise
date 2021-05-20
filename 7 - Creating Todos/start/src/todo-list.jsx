import todoJson from './todos.json';
import { Todo } from './todo';
import { useState } from 'react';

export const TodoList = () => {
    const [todos, setTodos] = useState(todoJson);

    const updateTodo = (id) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id !== id) {
                return todo;
            }
            todo.completed = !todo.completed;
            return todo;
        });
        
        setTodos(updatedTodos);
    };

    const deleteTodo = (id) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);

        setTodos(updatedTodos);
    }

    return todos.map(({userId, ...todo}) => 
        <Todo key={todo.id} {...todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />);
};