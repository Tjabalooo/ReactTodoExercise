import todoJson from './todos.json';
import { Todo } from './todo';
import { TodoForm } from './todo-form'
import { useEffect, useState } from 'react';

const fetchTodos = async () => {
    if (window.localStorage.hasOwnProperty('todos') === false) {
        window.localStorage.setItem('todos', JSON.stringify(todoJson));
    }

    return JSON.parse(window.localStorage.getItem('todos'));
};

const saveTodos = async (todos) => {
    window.localStorage.setItem('todos', JSON.stringify(todos));
};

const [LOADING, SAVING, IDLE, SUCCESS, FAILURE] = ['loading', 'saving', 'idle', 'success', 'failure'];

export const TodoList = () => {
    const [todos, setTodos] = useState(null);
    const [status, setStatus] = useState(IDLE);

    useEffect(() => {
        if (todos === null) {
            document.title = 'Todos: N/A';
        }
        else {
            document.title = `Todos: ${todos.reduce((sum, curr) => {return sum + (curr.completed ? 0 : 1);}, 0)}`;
        }
    }, [todos]);

    useEffect(() => {
        setStatus(LOADING);
    }, []);

    useEffect(() => {
        if (todos !== null) {
            setStatus(SAVING);
        }
    }, [todos]);

    useEffect(() => {
        if (status === SAVING) {
            saveTodos(todos).then(() => {
                setStatus(SUCCESS);
            }).catch(() => {
                setStatus(FAILURE);
            });
        }
        else if (status === LOADING) {
            fetchTodos().then(result => {
                setTodos(result);
                setStatus(SUCCESS);
            }).catch(() => {
                setStatus(FAILURE);
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status])


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
    };

    const createTodo = (title) => {
        const newTodo = {id: Date.now(), userId: -1, title: title, completed: false};
        const updatedTodos = [newTodo, ...todos];

        setTodos(updatedTodos);
    };

    if (status === IDLE) {
        return null;
    }

    if (status === LOADING) {
        return <h3>Loading...</h3>;
    }

    if (status === FAILURE) {
        return <h3>Exception occured!</h3>;
    }

    const containerStyle = status === SAVING ? {
        pointerEvents: 'none',
        opacity: 0.5
    } : {};

    return (
        <div style={containerStyle}>
            <TodoForm createTodo={createTodo} />
            {todos.map(({userId, ...todo}) => 
                <Todo key={todo.id} {...todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />)}
        </div>
    );
};