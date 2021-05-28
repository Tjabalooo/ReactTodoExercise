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