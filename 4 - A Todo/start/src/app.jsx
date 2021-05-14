import { Hello } from './hello'

export const App = () => {
    return (
        <div>
            <Hello name="Joakim" />
            <Hello name="Anonymous" hidden={true} />
        </div>
    )
}