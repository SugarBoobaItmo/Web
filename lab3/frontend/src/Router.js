import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import LoginForm from "./pages/Auth/LoginForm";
import NotFound from "./pages/NotFound";
import RegisterForm from "./pages/Auth/RegisterForm";
import { UserService } from "./services/userService";
import { getToken } from "./token";
import MainPage from "./pages/MainPage/MainPage";

setInterval(async () => {
    const token = getToken();
    if (window.location.href.indexOf("/points") != -1) {
        if (!(await UserService.validate(token))) {
            window.location.href = "/login";
        }
    }
}, 6969);

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/points" element={<MainPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
