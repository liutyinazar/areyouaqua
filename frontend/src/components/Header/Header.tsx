import "./Header.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="menu">
          <div className="music">
            <h1>
              <Link to="/music">MUSIC</Link>
            </h1>
          </div>
          <div className="video">
            <h1>
              <Link to="/video">VIDEO</Link>
            </h1>
          </div>
          <div className="store">
            <h1>
              <Link to="/store">STORE</Link>
            </h1>
          </div>
          <div className="blog">
            <h1>
              <Link to="/blog">BLOG</Link>
            </h1>
          </div>
          <div className="contact">
            <h1>
              <Link to="/contact">CONTACT</Link>
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
