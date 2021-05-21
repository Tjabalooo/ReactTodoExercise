# 8 - Stored Todos

Up until now we've kept our todos in memory, losing all changes when reloading the page. In this exercise we will put them in [*localStorage*](https://www.w3schools.com/html/html5_webstorage.asp) instead, using *effects* to work with them in an asynchronous manner.

## Fetch and save

First up we need to create two async-functions outside of the TodoList-component to help us fetch and save our todos. The fetch will initialize our stored content with todos.json if there's no todos in the storage.

```javascript
const fetchTodos = async () => {
    if (window.localStorage.hasOwnProperty('todos') === false) {
        window.localStorage.setItem('todos', JSON.stringify(todoJson));
    }

    return JSON.parse(window.localStorage.getItem('todos'));
};

const saveTodos = async (todos) => {
    window.localStorage.setItem('todos', JSON.stringify(todos));
};
```

## Keeping track of component status

Transforming over to actually storing our todos and doing so asynchronously means that we need to keep track of the components status. Add a status-state to the component that can have the following values:

* idle
    * initial value for the components status
* loading
    * fetching the todos
* saving
    * saving the todos
* success
    * the component has successfully loaded or saved the todos
* failure
    * loading or saving ended in an exception

Setting statuses is done through *effects* that react to what's happening in the component. We need one that places us in a loading-state the first time the component is rendered. This is accomplished by using an empty dependency array.

```javascript
useEffect(() => {
    setStatus(LOADING);
}, []);
```

Secondly we need an effect that places the component in a saving-state if our todos change. By ***setting the initial value*** of our todos to *null* we can validate that we've gone through the inital fetch and not accidently save an emtpy array.

```javascript
useEffect(() => {
    if (todos !== null) {
        setStatus(SAVING);
    }
}, [todos]);
```

Finally we need an effect that reacts to changes in *status* that is carefully implemented so it doesn't create any harmful loops. This effect needs to work with the todos cause it fetches and saves them. That means that if we don't add *todos* to the dependency array as well we get a warning from the linter. Since we only want to run the effect when the status changes we can either live with the warning, add todos and get a bunch of extra calls or disable the linter for the given line. In our case we disable the linter, which in turn shows that any future changes should be done carefully.

```javascript
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
```

## Conditionally compose the component

With all that in place, we now have the tools to return the markup best suited for the given status. Three of the statuses ends up with invalid *todos*; idle, loading and failure. Make sure that the component returns something else then the list of todos in these cases. Saving-status is fairly safe but can be made even better by letting the saving-process end before more changes take place. Look att the example below for inspiration and then write your own solution.

```javascript
if (status === IDLE || status === LOADING || status === FAILURE) {
    return <h3>...</h3>;
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
```

## Extra

Write an effect that puts "Todos: [uncompleted todos count]" in *document.title* whenever *todos* changes.

Tip: use [Array.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) to aggregate how many uncompleted todos there are in *todos*.