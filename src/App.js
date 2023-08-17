import React from "react";
import { Route, Link, Navigate, useParams, Routes } from "react-router-dom";

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
              <Link to={`${user.id}`}>{`User ${user.id}`}</Link>
            </li>
          ))}
        </ul>
      </>
    );
  }

  function UserProfile() {
    const { userId } = useParams();

    return (
      <div>
        <Routes>
          <Route path={`${userId}/`} element={<Navigate to="profile" />} />
          <Route path="profile" element={<UserInfo userId={userId} />} />
          <Route path="edit" element={<Edit userId={userId} />} />
          <Route path="*" element={<Navigate to="profile" />} />
        </Routes>
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
      <Link to="users">Users list Page</Link>
      <Routes>
        <Route index element={<Home />} />
        <Route path="users/:userId?/*" element={<Users />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
