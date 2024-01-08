import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { UserService } from "../../services/userService";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../../redux/authSlice";

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
    } = useForm();

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        const user = {
            username: getValues("username"),
            password: getValues("password"),
        };
        const userData = await UserService.login(user);
        if (userData) {
            if (userData.message) {
                setError(userData.message);
            } else {
                dispatch(setToken(userData.token));
                dispatch(setUser(userData.login));
                navigate("/points");
            }
        }
    };

    const handleFieldChange = (event) => {
        setValue(event.target.name, event.target.value);
    };

    return (
        <div className="reg-form">
            <h1>Login Form</h1>
            <form onSubmit={handleSubmit(handleLogin)}>
                <div className="reg-form__input">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        {...register("username", {
                            required: "Username is required",
                            minLength: {
                                value: 3,
                                message:
                                    "Username must be at least 3 characters",
                            },
                            maxLength: {
                                value: 20,
                                message:
                                    "Username must be less than 20 characters",
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9]+$/,
                                message: "Username must be alphanumeric",
                            },
                        })}
                        onChange={handleFieldChange}
                    />
                    {errors.username && <p>{errors.username.message}</p>}
                </div>
                <div className="reg-form__input">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message:
                                    "Password must be at least 8 characters",
                            },
                            maxLength: {
                                value: 20,
                                message:
                                    "Password must be less than 20 characters",
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9]+$/,
                                message: "Password must be alphanumeric",
                            },
                        })}
                        onChange={handleFieldChange}
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <div className="reg-form__input">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        {...register("confirmPassword", {
                            required: "Password confirmation is required",
                            validate: (value) => {
                                if (value === getValues("password")) {
                                    return true;
                                } else {
                                    return "Passwords do not match";
                                }
                            },
                        })}
                        onChange={handleFieldChange}
                    />
                    {errors.confirmPassword && (
                        <p>{errors.confirmPassword.message}</p>
                    )}
                    {error && <p className="error">{error}</p>}
                </div>
                <button type="submit">Login</button>
                <Link to="/register">Register</Link>
            </form>
        </div>
    );
};

export default LoginForm;
