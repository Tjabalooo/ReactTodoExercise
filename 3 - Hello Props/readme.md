# 3 - Hello Props

Now it's time to introduce a major player in the component model, *props*! By sending values and callbacks down the component tree we can start adding behaviour to our React app.

## Say hello to someone

Edit the content of the Hello-component to use two parameters, *name* and *hidden*, and use destructuring assignment to make it more obvious for someone reading the code what parts of *props* the component uses.

Use *name* as part of the "Hello" string and *hidden* in a ternary operator that decides if the component returns null or if it returns the h1-element. Let *hidden* have a default value of *false*.

```javascript
import React from 'react';

export class Hello extends React.Component {
    render = () => {

        const {name, hidden=false} = this.props;

        return hidden ? null : <h1>{`Hello ${name}`}</h1>;
    }
}
```

Alter the App-module to contain a div with two Hello-components where one is visible and the other is hidden.

```javascript
import { Hello } from './hello'

export const App = () => {
    return (
        <div>
            <Hello name="Joakim" />
            <Hello name="Anonymous" hidden={true} />
        </div>
    )
}
```

## Difference between class and function

If we were to write our Hello-component as a function instead of as a class we would get *props* as an argument to the function instead of as part of the component *(functional components are stateless)*.

```javascript
export const Hello = ({name, hidden=false}) => {

    return hidden ? null : <h1>{`Hello ${name}`}</h1>;
    
}
```
