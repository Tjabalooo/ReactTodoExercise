import { Route, Switch } from 'react-router-dom';
import { TodoList } from './todo-list';
import { WelcomePage } from './welcome-page';
import { Login } from './login';
import { Navigation } from './navigation';
import { UserContextProvider } from './user-context';
import { RouteGuard } from './route-guard';

export const App = () => {
    return (
        <UserContextProvider>
            <Navigation />

            <div>
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <RouteGuard path="/todos">
                        <TodoList />
                    </RouteGuard>
                    <RouteGuard exact path="/">
                        <WelcomePage />
                    </RouteGuard>
                    <Route path="*">
                        <h2>404 - File not found...</h2>
                    </Route>
                </Switch>
            </div>
        </UserContextProvider>
    )
}