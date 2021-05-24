# 9 - A Welcoming Page

In this exercise we will give our app a landing page and a navigation menu using [React Router](https://reactrouter.com/web/guides/quick-start).

## The landing page

First up, lets create the landing page. This page is just a basic component with a welcoming message. You can create your own from scratch for pratice or you can copy the one below.

```javascript
const divStyle = {
    width: '60%',
    margin: '0 auto',
    padding: '40px',
    backgroundColor: 'white',
    borderRadius: '10px'
};

const textStyle = {
    textAlign: 'center'
}

export const WelcomePage = () => {
    return (
        <div style={divStyle}>
            <h1 style={textStyle}>Welcome back!</h1>
            <h3 style={textStyle}>(go get those tasks!)</h3>
        </div>
    );
}
```

## Installing and hooking up react-router-dom

*React Router* is contained in a npm package named *react-router-dom*. Stop your application and install that package.

```batch
npm install react-router-dom
```

To get routing working we need to wrap a portion (often the entire application) in a *router*, and in our case we're going to use the *BrowserRouter*. Anything that we wrap will be able to use the *Route*-component to route depending on the content of the Router (the browser URL in our case). Wrap our App-component as follows:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './app'
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
```

## Using a Route

Using a Route is just as easy as wrapping somehting that only should show given specifick routing conditions. Start out by wrapping the TodoList and the WelocomePage in the App like so:

```javascript
import { Route } from 'react-router-dom';
import { TodoList } from './todo-list';
import { WelcomePage } from './welcome-page';

export const App = () => {
    return (
        <div>
            <Route path="/todos">
                <TodoList />
            </Route>
            <Route path="/">
                <WelcomePage />
            </Route>
        </div>
    )
}
```

You will now land on the welcoming page, and editing the URL to end with */todos* will make the TodoList visible. The only problem is that at the bottom of the page our WelcomePage-component is visible as well since it matches the beginning of */todos*. This could be fixed by adding the *exact* attribute to the second Route, telling it to to only react to exact matches.

```html
<Route exact path="/">
    <WelcomePage />
</Route>
```

This doesn't cut it all the times though, because some times we actually want a partial hit and then do more routing down the line. And that is where the Switch-component comes in to play.

## Using Switch

With the Switch-component wrapping a couple of Route's, only the first match will be returned. Which isn't just great for the above mentioned deeper routing but also opens up for the possibility of writing a custom 404-page. The only thing we need to keep in mind is that the first match will be retuned, so any path that is a part of another one needs to come later in the sequence and any generic path (like *"/"*) should be set to *exact* to not catch the 404's.

```javascript
import { Route, Switch } from 'react-router-dom';
import { TodoList } from './todo-list';
import { WelcomePage } from './welcome-page';

export const App = () => {
    return (
        <div>
            <Switch>
                <Route path="/todos">
                    <TodoList />
                </Route>
                <Route exact path="/">
                    <WelcomePage />
                </Route>
                <Route path="*">
                    <h2>404 - File not found...</h2>
                </Route>
            </Switch>
        </div>
    )
}
```

# Adding navigation

Lets create a Navigation-component to use for navigating our app. We wish to use the *NavLink* and not just the *Link* and the reason is that *NavLink* have support for highlighting if the path of the link matches the route.

Just adding the markup is easy, the following does the trick (but there will be no highlighting):

```html
<nav>
    <NavLink exact to='/'>Home</NavLink>
    <NavLink to='/todos'>Todos</NavLink>
</nav>
```

But of course we want it to look nice as well! But styling a NavLink takes a bit of thought.

## NavLinks and styling

NavLinks are built on Links, and Links are built on anchor-tags. The difference is the amount of props that are used, and this is where the trick of styling a NavLink comes in. With styled components we can add props to the element or component that we style, and the NavLink presents us with *activeClassName* as a way of styling the highlight with a class. The following styled-components styling uses this fact to introduce a class-name and then uses that class to give the anchor-tag (which is what we render in the end) a highlight.

```javascript
const StyledNavLink = styled(NavLink).attrs({ activeClassName: 'selected'})`
    &:link, &:visited, &:hover, &:active {
        display: inline-block;
        text-decoration-line: none;
        font-size: 22px;
        padding: 10px;
        border-radius: 10px;
        margin: 0 5px 0 0;
        color: black;
        background-color: rgba(255,255,255,0);
        transition: background-color 400ms;

        &.${({activeClassName}) => activeClassName} {
            background-color: rgba(255,255,255,1);
            transition: background-color 400ms;
        }
    }
`;
```

Use the styled component above instead of the bare NavLink and follow up by adding the style object below to the nav-element.

```javascript
const navStyle = {
    margin: '5px 0',
    padding: '10px',
    backgroundColor: 'lightGray'
};
```

## Food for thought

Are there any risks with not giving *activeClassName* a more unique name then "active"?