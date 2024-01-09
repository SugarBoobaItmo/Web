// Header.js

import React from "react";
import styles from "./Header.module.css";

import LogoutButton from "../Buttons/LogoutButton";

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.header__info}>
                <p>Хабнер Георгий Евгеньевич</p>
                <p>P3231</p>
                <p>Вариант 938472</p>
            </div>
            <div className={styles.logout__button}>
                <LogoutButton />
            </div>
        </header>
    );
};

export default Header;
