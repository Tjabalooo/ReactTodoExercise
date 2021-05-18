import todos from './todos.json';
import { Todo } from './todo';

export const TodoList = () => {
    return todos.map(({userId, ...todo}) => <Todo key={todo.id} {...todo}/>);
};