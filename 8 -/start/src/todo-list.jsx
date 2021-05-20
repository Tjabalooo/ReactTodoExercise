import todoJson from './todos.json';
import { Todo } from './todo';
import { TodoForm } from './todo-form'
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

    const createTodo = (title) => {
        const newTodo = {id: Date.now(), userId: -1, title: title, completed: false};
        const updatedTodos = [newTodo, ...todos];

        setTodos(updatedTodos);
    }

    return (
        <>
            <TodoForm createTodo={createTodo} />
            {todos.map(({userId, ...todo}) => 
                <Todo key={todo.id} {...todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />)}
        </>
    );
};