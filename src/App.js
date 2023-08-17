import React from "react";
import { Route, Switch, Link, Redirect, useParams } from "react-router-dom";

const users = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

function App() {
  function Home() {
    return (
      <div>
        <h1>MainPage</h1>
      </div>
    );
  }

  function Users() {
    const { userId } = useParams();

    return (
      <div>
        <h1>Users Layout</h1>
        <Link to="/">Main Page</Link>
        {userId ? <UserProfile /> : <UsersList />}
      </div>
    );
  }

  function UsersList() {
    return (
      <>
        <h2>Users List Page</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <Link to={`/users/${user.id}`}>{`User ${user.id}`}</Link>
            </li>
          ))}
        </ul>
      </>
    );
  }

  function UserProfile() {
    const { userId } = useParams();
    const pathToProfile = `/users/${userId}/profile`;
    const pathToEdit = `/users/${userId}/edit`;

    return (
      <div>
        <Redirect to={pathToProfile} />
        <Route
          path={pathToProfile}
          render={() => <UserInfo userId={userId} />}
        />
        <Route path={pathToEdit} render={() => <Edit userId={userId} />} />
        <Redirect to={pathToProfile} />
      </div>
    );
  }

  function UserInfo({ userId }) {
    return (
      <div>
        <h1>UserPage</h1>
        <ul>
          <li>
            <Link to="/users">Users List Page</Link>
          </li>
          <li>
            <Link to={`/users/${userId}/edit`}>Edit this user</Link>
          </li>
        </ul>
        <h3>userid: {userId}</h3>
      </div>
    );
  }

  function Edit({ userId }) {
    return (
      <div>
        <h1>Edit User Page</h1>
        <ul>
          <li>
            <Link to={`/users/${userId}/profile`}>User profile Page</Link>
          </li>
          <li>
            <Link to={`/users/${+userId + 1}/profile`}>Another User</Link>
          </li>
          <li>
            <Link to="/users">Users list page</Link>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div>
      <h1>App Layout</h1>
      <Link to="/users">Users list Page</Link>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/users/:userId?" component={Users} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
