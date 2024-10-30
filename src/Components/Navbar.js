import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../Assets/Style Sheets/Navbar.css";
import { NavLink,useNavigate } from "react-router-dom";


function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); 
  navigate('/');
  };
  return (
    <nav className="navbar navbar-expand-lg main-navbar-dark">
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto"> 
          <li className="nav-item">
            <NavLink className="nav-link main-nav-link main-nav-item" to="/home">
              Home
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
              <button className="nav-link main-btn" onClick={handleLogout} style={{fontWeight:"bolder"}}>
                Logout
              </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
