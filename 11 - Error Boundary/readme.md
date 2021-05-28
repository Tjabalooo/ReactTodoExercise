# 11 - Error Boundary

In this exercise we will introduce an error into the Todo-component and then introduce an [Error Boundary](https://reactjs.org/docs/error-boundaries.html) to be able to render our todos even if a few of them are flawed.

## Introducing an error

Since our data is both local and static we wont get any unpredicted data, which in turn makes our app very fool proof. But that doesn't stop us from faking some trouble. The types of exceptions ment to be handled by Error Boundaries are the ones that pop up during render (not in *effects*, *event handlers* or *promises*). That means that if we make our render throw an exception we would get the scenario we're looking for.

Change Todo to use a function before rendering the title to mess it up a small amount of times (1%).

```javascript
const messUpTitle = (title) => {
    if (Math.random() > 0.99) {
        throw new Error('Title not good enough!');
    }
    return title;
}

return (
    <div style={containerStyle}>
        <div>
            <input style={checkboxStyle} id={id} type="checkbox" checked={completed} onChange={onCheckedChanged} />
            <Label htmlFor={id} completed={completed}>{messUpTitle(title)}</Label>
        </div>
        <Button onClick={onButtonClicked}>X</Button>
    </div>
);
```

If we try to access the todo-part of our app now we will in most cases (depending on how many todos the user has of course) end up with our app crashing. All because of one or two Todo's being flawed! In our example the problem would be easy to fix, but in a more complex component (maybe from a third-party) it would be a very good idea to use a *try-catch* like approach to block the complex problem from crashing the entire app.

## Creating an Error Boundary

So far we've just graced the surface of creating components as classes, so this will feel a bit different since an Error Boundary must be created as a class to be able to work, since an Error Boundary must be a *React.Component* and implement one or both of the functions *getDerivedStateFromError* and *componentDidCatch*.

Create the following component:

```javascript
import React from 'react';

export class ErrorBoundary extends React.Component {
    state = { error: null };

    static getDerivedStateFromError(error) {
        return { error: error };
    }

    render = () => {
        if (this.state.error !== null) {
            return <h3>{`${this.state.error}`}</h3>
        }
        return this.props.children;
    }
}
```

In our case we only need *getDerivedStateFromError*, a static function used to transform an error to the state of the Error Boundary that catched it. *componentDidCatch* is where we can do more with the information about the error, like logging.

## Using the Error Boundary

Using an Error Boundary is as easy as wrapping the component we want to guard against. We could place one around the entire TodoList, but we should always strive to minimize the impact of an error so lets target the Todo instead.

```html
return (
    <div style={containerStyle}>
        <TodoForm createTodo={createTodo} />
        {todos.map(({userId, ...todo}) => 
            <ErrorBoundary>
                <Todo key={todo.id} {...todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />
            </ErrorBoundary>
        )}
    </div>
);
```

## Making ErrorBoundary generic

The Error Boundary we've created always returns the string representation of the error in a h3-element, which isn't very generic. What we would like to do is use the [*render prop pattern*](https://reactjs.org/docs/render-props.html) so we can pass a function that renders the component instead of the actual component. Change ErrorBoundary's render-function as follows:

```javascript
render = () => {
    return this.props.children(this.state.error);
}
```

This means that ErrorBoundary now expects to get a callback that takes an error-object as parameter and renders a component, placing the responsibility of rendering a fallback on the code using ErrorBoundary instead of on ErrorBoundary.

Change the usage of ErrorBoundary to work with the change we just made and render a fallback that fits into the slot of a Todo (don't use Todo, the *messUpTitle*-function could make the fallback crash and then the app dies). A good tip is use a div and then copy the style from the containing div-element in Todo.

Using generic Error Boundaries lets us use them in more cases, not locking them to a specific component. Making a non generic Error Boundary look good in the context of TodoList would force us to return styled markup from ErrorBoundary that would'nt work for other components.