# 4 - A Todo

We will now create a Todo-component and style it using *styled-components* and *inline styling*.

## Creating the component

Create a new file named *todo.jsx* to house the Todo-component. The Todo-component will make use of three properties; *id*, *title* and *completed*. The unstyled markup is seen below, create a Todo-component that takes the tree properties and returns the markup.

```html
<div>
    <div>
        <input id={id} type="checkbox" checked={completed} />
        <label htmlFor={id}>{title}</label>
  </div>
  <button>X</button>
</div>
```

## Using the component

Update the App-component to contain a Todo. Place the arguments to the component in a object and spread it instead of writing arguments one by one. In this case, spreading an object instead of the alternative makes the code easier to read and work with. This is a flavor, not a rule.

```javascript
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

    // alt: <Todo id={1} title="Something i need to do" completed={false} />
}
```

## Adding a small part of global styling

We have a small portion of global styles that we want to apply to our app, and those should be placed in a css-file. Create a file named *index.css*, import it into index.js and add the following to it:

```css
* {
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
	  
	background: #f5f5f5;
}
```

## Introducing styled-components

CSS can style [pseudo elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes) which makes it possible to change the apperance of an element depending on a range of scenarios. [*Styled-components*](https://styled-components.com/docs/basics#getting-started) is a commonly used library that allows us to write scoped CSS in a React component by generating a unique class name and using that in the scope of the component. The first thing we're going to use *styled-components* for is to make our button light up when hovered.

First up we need to install the package (close the application during installation).

```batch
npm install styled-components
```

A component styled by *styled-components* is created in a form that makes it look very much like CSS. For more informtaion on the specifics, follow the link above to the official homepage of the library.

Add a styled component named Button in *todo.jsx* and use that instead of the normal button in the component. By creating the styled component in *todo.jsx* without exporting it we get an isolated styling meant only for the Todo-component.

```javascript
import styled from 'styled-components';

const Button = styled('button')`
    font-size: 22px;
    color: #cc9a9a;

    &:hover {
        color: #af5b5e;
    }`;

export const Todo = ({id, title, completed=false}) => {
    return (
        <div>
            <div>
                <input id={id} type="checkbox" checked={completed} />
                <label htmlFor={id}>{title}</label>
            </div>
            <Button>X</Button>
        </div>
    );
};
```

An other place where we want to use *styled-component* is for our label. We want parts of the styling to depend on if the Todo is completed or not, and we will do this by passing the boolean to the styled component.

Add a styled component named Label (*unchecked* and *checked* are svg elements used to get a custom checkbox):

```javascript
const unchecked = 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E';
const checked = 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E';

const Label = styled('label')`
    background-position: center left;
    background-repeat: no-repeat;
    padding: 15px 15px 15px 60px;
    display: inline-block;
    background-image: url('${({completed}) => completed ? checked : unchecked}');
    color: ${({completed}) => completed ? '#d9d9d9' : 'initial'};
    text-decoration: ${({completed}) => completed ? 'line-through' : 'none'}`;
```

Use the styled component instead of the label and don't forget to set the attribute completed to the value of completed.

```javascript
<Label htmlFor={id} completed={completed}>{title}</Label>
```

## Trying out inline styling

We have two things left to style; the checkbox and the container. Both of these could be styled with *styled-components* as well, but we will be doing it using *inline styling* this time for the sake of the exercise.

Add the styles for the div and the input:

```javascript
const containerStyle = {
    padding: '8px 16px',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '5px 0'
};

const checkboxStyle = {
    appearance: 'none'
};
```

And then use them to style the elements of interest:

```javascript
export const Todo = ({id, title, completed=false}) => {
    return (
        <div style={containerStyle}>
            <div>
                <input style={checkboxStyle} id={id} type="checkbox" checked={completed} />
                <Label htmlFor={id} completed={completed}>{title}</Label>
            </div>
            <Button>X</Button>
        </div>
    );
};
```

## Validation

Before moving on, don't forget to validate that the label change as expected if you change the value of *completed* that is sent down to the Todo-component.
