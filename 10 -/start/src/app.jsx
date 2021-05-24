import { Route, Switch } from 'react-router-dom';
import { TodoList } from './todo-list';
import { WelcomePage } from './welcome-page';
import { Navigation } from './navigation';

export const App = () => {
    return (
        <>
            <Navigation />

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
        </>
    )
}