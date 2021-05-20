# 7 - Creating Todos

In this exercise we will create a TodoForm; a component containing a form-element where we can submit a text that in turn will generate a new todo at the top of our list.

## Create TodoForm

Create a new component named TodoForm that takes a callback through which it can create a todo and start out by letting it return the following markup:

```html
<form>
    <input placeholder="What do you need to do?"/>
</form>
```

Add TodoForm to the TodoList, above the rendering of the list. The trick to returning more then one element without placing them in a div-element (many times we know that the consuming component can, or should, handle a collection of elements) is to put them in a [*React fragment*](https://reactjs.org/docs/fragments.html).

```javascript
return (
    <>
        <TodoForm />
        {todos.map(({userId, ...todo}) => 
            <Todo key={todo.id} {...todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />)}
    </>
);
```

Add the following *inline styling* to the input-element:

```javascript
{
  width: '100%',
  backgroundColor: '#FFF',
  padding: 16,
  fontSize: 24,
  fontStyle: 'italic',
  fontWeight: 300,
  border: 'none'
}
```

## Creating a controlled component

We can enter text into our new form but its not a part of the components state, making it an uncontrolled component. To transform our TodoForm from uncontrolled to controlled we need to give it a state and update that state when the input field changes.

Use the *useState* hook to give TodoForm a state that is initially an empty string and then add the following function that uses the set'er and attach it to the onChange-event of the input field.

```javascript
const textChanged = (event) => {
    setTitle(event.target.value);
}
```

Finish the transformation over to a controlled component by setting the *value* of the input field to the text stored in the state.

```html
<input style={inputStyle} onChange={textChanged} value={title} placeholder="What do you need to do?"/>
```

Looking at the component in *React Developer Tools* we can now see that the TodoForm has a state that updates when we change the content of the input field.

## Connecting the dots and creating a Todo

Before we actually use the callback we added to the TodoForm-component we need to create a function to call. Add the following function to the TodoList-component. It uses the rest operator in an array assignment to fuse together our existing list of todos with the new one at the start.

```javascript
const createTodo = (title) => {
    const newTodo = {id: Date.now(), userId: -1, title: title, completed: false};
    const updatedTodos = [newTodo, ...todos];

    setTodos(updatedTodos);
}
```

Then use it as the callback sent to TodoForm, followed by adding the following arrow-function in the TodoForm and making it listen for the onSubmit-event of the form-element. The function prevents the DOM's default behaviour by calling *preventDefault* and then uses the callback before clearing the input field.

```javascript
const onSubmit = (event) => {
    event.preventDefault();
    if (title !== "") {
        createTodo(title);
        setTitle('');
    }
}
```