# Many Todos

We now have a Todo-component, but that is just a small peace of the puzzle. In this exercise we will create a TodoList-component that will use a json file to populate and return a list of Todo's.

## Creating our new component

Create a new component named TodoList in a corresponding lowercase filename. This component will import a json-file named *todos.json* that you find in the same directory as this exercise. Download the file and place it in the src-directory of the project.

Importing the content of a json-file with JSX is as simple as making an import-statement, similar to importing a module.

```javascript
import todos from './todos.json';
```

Rendering a list (returning markup is referred to as rendering) is done through the use of [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), which allows us to transform every element of an array and return the resulting array. This way we can render one Todo-component for each element in *todos.json*.

```javascript
export const TodoList = () => {
    return todos.map(todo => <Todo key={todo.id} {...todo}/>)
}
```

## Rendering the component

With our new TodoList-component ready, replace the rendring of Todo in the App-component with this and we should now have a list of todo's instead of just a lonely one.

## Bonus

If we look in *todos.json* we can see that there's a *userId* property that we don't use in our Todo-component, but when investigating our component through *React Developer Tools* we can see that it's there anyway.

![Todo.props](images/Todo.userId.png)

Feeding components with properties they don't use is bad practice and should be avoided. Thankfully we can take advantage of the rest-operator when working through the map-function to peel away the userId from our todo-object.

```javascript
return todos.map(({userId, ...todo}) => <Todo key={todo.id} {...todo}/>);
```