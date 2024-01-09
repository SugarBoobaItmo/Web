import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { UserService } from "../../services/userService";
import { Link, useNavigate } from "react-router-dom";
import Clock from "../../components/Clock/Clock";
import styles from "./Form.module.css";

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
    } = useForm();

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async () => {
        const user = { username: getValues("username"), password: getValues("password") };
        const userData = await UserService.register(user);
        if (userData) {
            if (userData.message) {
                setError(userData.message);
            } else {
                navigate("/login");
            }
        }
    }

    const handleFieldChange = (event) => {
        setValue(event.target.name, event.target.value);
    };

    return (
        <div className={styles.form}>
            <h1>Registration Form</h1>
            <Clock />
            <form onSubmit={handleSubmit(handleRegister)}>
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
                                value: 3,
                                message:
                                    "Password must be at least 3 characters",
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
                    <label htmlFor="passwordConfirm">Confirm Password</label>
                    <input
                        type="password"
                        id="passwordConfirm"
                        {...register("passwordConfirm", {
                            required: "Password is required",
                            minLength: {
                                value: 3,
                                message:
                                    "Password must be at least 3 characters",
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
                            validate: {
                                matchesPreviousPassword: (value) => {
                                    const { password } = getValues();
                                    return (
                                        password === value ||
                                        "Passwords should match!"
                                    );
                                },
                            },
                        })}
                        onChange={handleFieldChange}
                    />
                    {errors.passwordConfirm && (
                        <p>{errors.passwordConfirm.message}</p>
                    )}
                </div>
                {error && <p className="error">{error}</p>}

                <button type="submit">Register</button>
                <Link className={styles.link} to="/login">Login</Link>
            </form>
        </div>
    );
};

export default RegisterForm;
