// PointsForm.js

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./PointsForm.module.css";

const PointsForm = ({ onSubmit, onDelete, onRChange, error }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
    } = useForm();

    const [checkboxValues, setCheckboxValues] = useState({
        x: ["-4", "-3", "-2", "-1", "0", "1", "2", "3", "4"],
        r: ["-4", "-3", "-2", "-1", "0", "1", "2", "3", "4"],
    });

    const handlePoint = () => {
        const { x, y, r } = getValues();
        onSubmit(x[0], y, r[0]);
    };

    const handleCheckboxChange = (name, value) => {
        setValue(name, value);
    };

    const handleRChange = async (value) => {
        setValue("r", value);
        onRChange(value);
    };

    return (
        <div className={styles.form}>
            <form >
                <label className={styles.label} htmlFor="x">X</label>
                {checkboxValues.x.map((value) => (
                    <label key={value}>
                        <input
                            type="checkbox"
                            name="x"
                            value={value}
                            {...register("x", {
                                required: "x is required",
                            })}
                            onChange={() => handleCheckboxChange("x", value)}
                            className={styles.checkbox}
                        />
                        {value}
                    </label>
                ))}
                <br />
                <label className={styles.label} htmlFor="y">Y</label>
                <input
                    type="text"
                    id="y"
                    name="y"
                    {...register("y", {
                        required: "y is required",
                        min: {
                            value: -3,
                            message: "y must be at least -3",
                        },
                        max: {
                            value: 3,
                            message: "y must be less than 3",
                        },
                        pattern: {
                            value: /^[-+]?[0-9]*\.?[,0-9]+$/,
                            message: "y must be a number",
                        },
                    })}
                    onChange={(e) => setValue("y", e.target.value.replace(",", "."))}
                    className={styles.inputText}
                />
                <br />
                <label className={styles.label} htmlFor="r">R</label>
                {checkboxValues.r.map((value) => (
                    <label key={value}>
                        <input
                            type="checkbox"
                            name="r"
                            value={value}
                            {...register("r", {
                                required: "r is required",
                            })}
                            onChange={() => handleRChange(value)}
                            className={styles.checkbox}
                        />
                        {value}
                    </label>
                ))}
                <div className={styles.buttonContainer}>
                    <button type="submit" onClick={handleSubmit(handlePoint)} className={styles.button}>Add</button>
                    <button className={styles.delete} onClick={onDelete}>Delete</button>
                    {error && <p>{error}</p>}
                    {errors.x && <p className={styles.error}>{errors.x.message}</p>}
                    {errors.y && <p className={styles.error}>{errors.y.message}</p>}
                    {errors.r && <p className={styles.error}>{errors.r.message}</p>}
                </div>
            </form>
        </div>
    );
};

export default PointsForm;
