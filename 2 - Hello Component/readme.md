# 1 - Hello Component

We will now hoist our "Hello World!" from *index.js* into a Hello-component, then placing it in an App-component that in turn will be used to give our React app a good entry point.

## Create a good entry point

First up we want an entry point so we can keep *index.js* as clean as possible. Do this by creating a file named app.jsx *(marking the file as jsx makes it more obvious that it contains JSX)* in the src-folder and add the following:

```javascript
export const App = () => {
    
}
```

Then follow that up by importing the App-component in *index.js* and using that instead of the h1-element.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

## Create a Hello component

Create a new file in the src-folder named hello.jsx and add the following:

```javascript
import React from 'react';

export class Hello extends React.Component {
    render = () => {
        return <h1>Hello World!</h1>;
    }
}
```

## Using the component

Just like we did in *index.js* we now import our newly exported Hello-component into *app.jsx* and then all we have to do is return our component from the App-component.

```javascript
import { Hello } from './hello'

export const App = () => {
    return <Hello />
}
```

## Class vs Function reflection

Inpsect the App-component and the Hello-component. We wrote one as a class and the other as a function to demonstrate the differences and the fact that a function contains less code. From here on we will only create components through classes in the edge cases where it's needed.