import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ login }) => {
  const navigate = useNavigate();
  const initialUserState = {
    name: "",
    id: "",
  };

  const [user, setUser] = useState(initialUserState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    login(user);
    navigate("/");
  };

  return (
    <form className="submit-form" onSubmit={handleLogin}>
      <h2 className="text-center mt-3">Login Form</h2>
      <div className="form-group">
        <label htmlFor="user">Username:</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          required
          value={user.name}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="id">ID:</label>
        <input
          type="text"
          className="form-control"
          id="id"
          name="id"
          required
          value={user.id}
          onChange={handleInputChange}
        />
      </div>

      <button type="submit" className="btn btn-success mt-3">
        Login
      </button>
    </form>
  );
};

export default Login;
