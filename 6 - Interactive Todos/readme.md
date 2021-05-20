# 6 - Interactive Todos

With a list of todo's rendering we have arrived at the point where we want to interact with them. In this exercise we will give our TodoList a state and give each Todo callbacks through which they can notify if they are changed.

## Giving TodoList a state

Since we're working with stateless components we will be using the *useState*-hook to get a stored state. When calling the useState-hook we get an array containing the states current value and a callback to inform React that the value has changed and that the component should be rerendered. The parameter to useState sets the initial value of the created state.

```javascript
import todoJson from './todos.json';
import { Todo } from './todo';
import { useState } from 'react';

export const TodoList = () => {
    const [todos, setTodos] = useState(todoJson);

    return todos.map(({userId, ...todo}) => <Todo key={todo.id} {...todo}/>);
};
```

## Creating callbacks

We should now have the exact same app as before, but with our todo's collection in a state we can now manipulate them. The manipulation is done through interacting with the Todo-component so what we want to do is create functions in our TodoList that we can use as callbacks.

Create the following arrow-functions inside the TodoList component (if we place it outside we wont be able to scope the setTodos-callback).

```javascript
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
```

When updating a todo we use *map* to create a new array where the todo with the given id is updated and when deleting we use *filter* to get an array were the given id is removed.

Just creating our functions aren't enough though, we need to give these callbacks to our Todo's as well. Note that by doing this we have decided what the property-names in Todo will be.

```javascript
return todos.map(({userId, ...todo}) => 
        <Todo key={todo.id} {...todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />);
```

## Making our Todo interactive

With the functions that we want to use as callbacks in place we need to actually use them in our Todo-component. Assign the two new properties through object destructuring assignment and then use them when checked is changed and when the button is clicked.

```javascript
export const Todo = ({id, title, completed=false, updateTodo, deleteTodo}) => {

    const onCheckedChanged = (event) => {
        updateTodo(id);
    }

    const onButtonClicked = (event) => {
        deleteTodo(id);
    }

    return (
        <div style={containerStyle}>
            <div>
                <input style={checkboxStyle} id={id} type="checkbox" checked={completed} onChange={onCheckedChanged} />
                <Label htmlFor={id} completed={completed}>{title}</Label>
            </div>
            <Button onClick={onButtonClicked}>X</Button>
        </div>
    );
};
```

When we add listeners to events in our elements we could write our lambda directly in the markup (example below). The recommendation though, is to keep them seperate to increase readability.

```html
<Button onClick={event => deleteTodo(id)}>X</Button>
```

## Important!

A common misconception is that a component is rerendered the moment a *setState*-callback is invoked. This is not the case! React is notified that the component should be rerendered and will do that eventually. A great way to view a component is as a ***slice in time***. Given certain props and a certain set of states the component will have a certain result. Getting that result is a case of fulfilling those criterias.

Also, "render" doens't mean that the component does any changes to the DOM. Rendering a component means that it updates the virtual DOM, followed by a diff-check and depending on the outcome an update to the DOM. This is what makes React so fast; only updating the absolut minimum of the DOM.