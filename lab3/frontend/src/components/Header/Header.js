import LogoutButton from "../Buttons/LogoutButton";

const Header = () => {
    return (
        <header className="header">
            <div className="header__info">
                <p>Хабнер Георгий Евгеньевич</p>
                <p>P3231</p>
                <p>Вариант 938472</p>
            </div>
            <LogoutButton />
        </header>
    );
};

export default Header;