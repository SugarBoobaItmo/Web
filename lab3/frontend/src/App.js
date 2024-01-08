import "./App.css";
import LoginForm from "./pages/Auth/LoginForm";
import { useSelector } from "react-redux";

function App() {
  const users = useSelector((state) => state.customers.users);
  return (
            <div className="App">
                <h1>React App</h1>
                <LoginForm />
                {users.length > 0
                    ? users.map((user) => (
                          <div key={user.id}>{user.username}   {user.password}</div>
                      ))
                    : "NO DATA"}
            </div>
    );
}

export default App;
