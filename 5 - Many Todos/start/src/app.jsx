import { Todo } from './todo';

export const App = () => {

    const todo = {
        id: 1,
        title: "Something I need to do",
        completed: false
    };

    return (
        <Todo {...todo} />
    )
}