import React, { useState } from "react";
import { useForm } from "react-hook-form";

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
        <div className="points-form">
            <form onSubmit={handleSubmit(handlePoint)}>
                <label htmlFor="x">X</label>
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
                        />
                        {value}
                    </label>
                ))}
                <br />
                {errors.x && <p>{errors.x.message}</p>}
                <br />
                <label htmlFor="y">Y</label>
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
                            value: /^[-+]?[0-9]*\.?[0-9]+$/,
                            message: "y must be a number",
                        },
                    })}
                    onChange={(e) => setValue("y", e.target.value)}
                />
                {errors.y && <p>{errors.y.message}</p>}
                <br />
                <label htmlFor="r">R</label>
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
                        />
                        {value}
                    </label>
                ))}
                <br />
                <button type="submit">Add</button>
                {error && <p>{error}</p>}
            </form>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
};

export default PointsForm;
