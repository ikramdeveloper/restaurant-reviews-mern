import { Link } from "react-router-dom";

const Navbar = ({ user, logout }) => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <a href="/restaurants" className="navbar-brand">
        Restaurant Reviews
      </a>
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to={"/restaurants"}>
            Restaurants
          </Link>
        </li>
        <li className="nav-item">
          {user ? (
            <button
              onClick={logout}
              className="nav-link btn btn-secondary"
              style={{ cursor: "pointer" }}
            >
              Logout {user.name}
            </button>
          ) : (
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
          )}
        </li>
      </div>
    </nav>
  );
};

export default Navbar;
