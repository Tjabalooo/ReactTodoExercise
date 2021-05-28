import styled from 'styled-components';

const Button = styled('button')`
    font-size: 22px;
    color: #cc9a9a;

    &:hover {
        color: #af5b5e;
    }`;

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

export const Todo = ({id, title, completed=false, updateTodo, deleteTodo}) => {

    const onCheckedChanged = (event) => {
        updateTodo(id);
    }

    const onButtonClicked = (event) => {
        deleteTodo(id);
    }

    const messUpTitle = (title) => {
        if (Math.random() > 0.99) {
            throw new Error('Title not good enough!');
        }
        return title;
    }

    return (
        <div style={containerStyle}>
            <div>
                <input style={checkboxStyle} id={id} type="checkbox" checked={completed} onChange={onCheckedChanged} />
                <Label htmlFor={id} completed={completed}>{messUpTitle(title)}</Label>
            </div>
            <Button onClick={onButtonClicked}>X</Button>
        </div>
    );
};