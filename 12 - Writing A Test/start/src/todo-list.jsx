import todoJson from './todos.json';
import { Todo } from './todo';
import { TodoForm } from './todo-form'
import { useEffect, useState } from 'react';
import { useUserContext } from './user-context';
import { ErrorBoundary } from './error-boundary';

const fetchTodos = async (userId) => {
    if (window.localStorage.hasOwnProperty('todos') === false) {
        window.localStorage.setItem('todos', JSON.stringify(todoJson));
    }

    return JSON.parse(window.localStorage.getItem('todos')).filter(todo => todo.userId === userId);
};

const saveTodos = async (todos, userId) => {
    const otherTodos = JSON.parse(window.localStorage.getItem('todos')).filter(todo => todo.userId !== userId);
    window.localStorage.setItem('todos', JSON.stringify([...todos, ...otherTodos]));
};

const [LOADING, SAVING, IDLE, SUCCESS, FAILURE] = ['loading', 'saving', 'idle', 'success', 'failure'];

const todoContainerStyle = {
    padding: '8px 16px',
    backgroundColor: 'White',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '5px 0'
};

export const TodoList = () => {
    const [todos, setTodos] = useState(null);
    const [status, setStatus] = useState(IDLE);
    const { activeUser } = useUserContext();

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
            saveTodos(todos, activeUser.id).then(() => {
                setStatus(SUCCESS);
            }).catch(() => {
                setStatus(FAILURE);
            });
        }
        else if (status === LOADING) {
            fetchTodos(activeUser.id).then(result => {
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
        const newTodo = {id: Date.now(), userId: activeUser.id, title: title, completed: false};
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
                <ErrorBoundary key={todo.id}>
                    {(error) => {
                        if (error !== null) {
                            return (
                                <div style={todoContainerStyle}>
                                    <h3 style={{display: 'block'}}>{`${error}`}</h3>
                                </div>
                            );
                        }
                        return <Todo {...todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />;
                    }}
                </ErrorBoundary>
            )}
        </div>
    );
};