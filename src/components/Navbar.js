import { useNavigate } from "react-router-dom";
import logo from "../images/Logo.png";

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand" onClick={() => navigate("/")}>
        <img src={logo} width="200" height="40" alt="temp alt text" />
      </div>
    </nav>
  );
}

export default Navbar;
