# 10 - Adding Users

In this exercise we will add a context that shares user-related state and functions and wrap most of our app in it. This in turn will enable us to work with all things user-related with ease.

## Creating a user-context

We will be following the *Provider Pattern* because it gives us a user friendly module to consume. With that in mind, start by creating a file for our context.

The first thing we need is a bunch of users. We will keep this very simple and have a static set of users that correspond to the *userId's* in *todos.json*.

```javascript
const users = [
    {id: 1, name: 'one'},
    {id: 2, name: 'two'},
    {id: 3, name: 'three'},
    {id: 4, name: 'four'},
    {id: 5, name: 'five'},
    {id: 6, name: 'six'},
    {id: 7, name: 'seven'},
    {id: 8, name: 'eight'},
    {id: 9, name: 'nine'},
    {id: 10, name: 'ten'},
];
```

Next up we want three functions; one that makes it easy to find a user by name, one that helps us store a user in the [sessionsStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) and one that helps us retrieve the stored user from sessionStorage.

```javascript
const findUser = (name) => {
    const user = users.find((u) => u.name === name);
    if (user === undefined) {
        return null; 
    }
    return user;
};

const storeActiveUser = (user) => {
    sessionStorage.setItem('active-user', JSON.stringify(user));
}

const getStoredActiveUser = () => {
    if (sessionStorage.hasOwnProperty('active-user')) {
        return JSON.parse(sessionStorage.getItem('active-user'));
    }
    return null;
}
```

With that we have all we need to create our context! The code below creates the context, composes the provider in a component and exposes a function for using the context. Make sure you understand the code before moving on!

```javascript
const userContext = React.createContext();

export const UserContextProvider = ({children}) => {
    const [activeUser, setActiveUser] = useState(null);
    const [loginFailed, setLoginFailed] = useState(false);

    useEffect(() => {
        const storedActiveUser = getStoredActiveUser();
        if (storedActiveUser !== null) {
            setActiveUser(storedActiveUser);
        }
    }, []);

    useEffect(() => {
        storeActiveUser(activeUser);
    }, [activeUser])

    const value = {
        activeUser: activeUser,
        login: (name) => {
            const user = findUser(name);
            if (user === null) {
                setLoginFailed(true)
            }
            else {
                setLoginFailed(false);
                setActiveUser(user);
            }
            
        },
        logout: () => setActiveUser(null),
        loginFailed: loginFailed
    };

    return (
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
    );
}

export const useUserContext = () => {
    return useContext(userContext);
}
```

## Creating a Login-component

Create a new component named Login. First up, to be able to create something of a login-screen at all we need access to *activeUser*, *login* and *loginFailed*.

```javascript
const { activeUser, login, loginFailed } = useUserContext();
```

A somewhat minimum of what we need to return as markup is the following:

```html
<form onSubmit={onSubmit}>
    <label htmlFor='name'>Name: </label>
    <input id='name' type='text' value={name} onChange={onChange}></input>
    <input type='submit' value='Login'></input>
    {loginFailed ? <h3>Invalid user!</h3> : null}
</form>
```

Fill out the blanks *(onChange, onSubmit, name...)* to create a controlled component that uses *login* on submit to try and login the given *name*. If an unvalid user is given then *loginFailed* will be set to true and the h3-element will be rendered as well.

In [*inspiration*](10%20-%20Adding%20Users/inspiration) you can find a Login-component using styled-components in a more advanced way to style the entire markup in one go.

Finally, to be able to route to our Login-component we need to add it to the Switch in App.

```html
<Route path="/login">
    <Login />
</Route>
```

## Logout

Now that we can login, we also need to be able to logout. We will do this through a button in the Navigation-component.

```html
<nav style={navStyle}>
    <StyledNavLink exact to='/'>Home</StyledNavLink>
    <StyledNavLink to='/todos'>Todos</StyledNavLink>
    <button onClick={onClick}>Logout</button>
</nav>
```

Add the button and make the onClick-callback call *logout*, found in the user-context.

After making sure the button works as expected *(browse the sessionStorage under developer tools to validate that active-user changes)*, make sure that the button only renders if someone is logged in.

A version of Navigation with a styled button can be found in [*inspiration*](10%20-%20Adding%20Users/inspiration).

# Guarding a Route

Now that we can login and logout, it's time to make sure that we only access our application when we're logged in. This is done by *guarding our routes*, a common thing in React.

Guarding a route is done by component composition; embedding a Route in a custom component that uses the render-prop of the Route to control the behaviour and which picks out the component- and children-props and uses them in a way that Route does *(children first, component second)*. Given an *authentication-check* the user is either redirected (in our case to the route of our Login-component) or routed as expected.

It sounds complicated, but it's actually pretty straight forward when we look at it.

```javascript
import { Redirect, Route } from 'react-router-dom';
import { useUserContext } from './user-context';

export const RouteGuard = ({children = undefined, component: Component = undefined, ...rest}) => {
    const { activeUser } = useUserContext();

    return (
        <Route {...rest} render={(props) => {
            if (activeUser === null) {
                return <Redirect to='/login' />;
            }
            else if (children !== undefined) {
                return children;
            }
            else if (Component !== undefined) {
                return <Component {...props} />;
            }
        }} />
    );
};
```

Create the RouteGuard-component and swap out the Route's wrapping TodoList and WelcomePage with RouteGuard's in App. A cool effect of redirecting is that we can (if we want) keep the Navigation-component as is cause nothing will highlight as long as we get redirected to /login.

## Using the shared information

First up, lets say welcome to the user who is logged in by name. Update WelcomePage to say "Welcome back [activeUser&#46;name]!" instead of just "Welcome back!". All we have to do is import *useUserContext* and pick out the information we need. Pretty neat!

Next lets filter the *todos* to only show the logged in users tasks. Update *fetchTodos* and *saveTodos* in TodoList to take userID into account:

```javascript
const fetchTodos = async (userId) => {
    if (window.localStorage.hasOwnProperty('todos') === false) {
        window.localStorage.setItem('todos', JSON.stringify(todoJson));
    }

    return JSON.parse(window.localStorage.getItem('todos')).filter(todo => todo.userId === userId);
};

const saveTodos = async (todos, userId) => {
    const otherTodos = JSON.parse(window.localStorage.getItem('todos')).filter(todo => todo.userId !== userId);
    window.localStorage.setItem('todos', JSON.stringify([...todos, ...otherTodos]));
};
```

Then update the corresponding parts of TodoList to send in *activeUser&#46;id* where todos are fetched and saved. Once again all we need to do is to import the context and then pick out the information we're interested in.