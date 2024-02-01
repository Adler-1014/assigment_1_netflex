import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";
import styles from "./Header.module.scss";
import { useProfile } from "../../contexts/profile.context";

function Header() {
  const { isLoggedIn, logOut } = useAuth();
  const { nickname } = useProfile();

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        NETFLEX
      </Link>

      <nav>
        <ul>
          {isLoggedIn ? (
            <>
              <li>{nickname || "User"}</li>
              <li>
                <Link to="./my-page">My Page</Link>
              </li>
              <li>
                <button onClick={logOut}>로그아웃</button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/sign-in">로그인하기</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
