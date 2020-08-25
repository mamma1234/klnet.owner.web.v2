const users = [
{
    id: '1',
    name: 'Nathan',
    role: 'Web Developer',
},
{
    id: '2',
    name: 'Johnson',
    role: 'React Developer',
},
{
    id: '3',
    name: 'Alex',
    role: 'Ruby Developer',
},
];

const Home = () => {
    return <div>This is the home page</div>;
};

const About = () => {
    return <div>This is the about page</div>;
};

const Users = () => {
    return (
        <>
        <ul>
            {users.map(({name, id}) => (
            <li key={id}>
                <Link to={`/users/${id}`}>{name}</Link>
            </li>
            ))}
        </ul>
        <Route path='/users/:id' component={User} />
        <hr />
        </>
    );
};