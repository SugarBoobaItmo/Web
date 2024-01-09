import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { UserService } from "../../services/userService";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../../redux/authSlice";
import Clock from "../../components/Clock/Clock";
import styles from "./Form.module.css";

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

        try {
            const userData = await UserService.login(user);
            dispatch(setToken(userData.token));
            dispatch(setUser(userData.login));
            navigate("/points");
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. Please try again later.");
            }
        }
    };

    const handleFieldChange = (event) => {
        setValue(event.target.name, event.target.value);
    };

    return (
        <div className={styles.form}>
            <h1>Login Form</h1>
            <Clock />
            <form onSubmit={handleSubmit(handleLogin)}>
                <div className={styles.form__input}>
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
                <div className={styles.form__input}>
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
                <div className={styles.form__input}>
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
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>
                <Link className={styles.link} to="/register">
                    Register
                </Link>
            </form>
        </div>
    );
};

export default LoginForm;
