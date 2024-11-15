
import React from 'react';

// import VmList from './components/VmList';

function App(props) {

    const users = props.users;
    console.log(users, "props");
    
    return (
        <div>
            <h1>Hello from React in Django!</h1>
            {users.map((user, i) => (<div key={i}>
                <h2>{user.name}</h2>
                <p>{user.age}</p>
            </div>))}
            <div>end</div>
            {/* <VmList /> */}
        </div>
    );
}

export default App;