import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { store } from "../redux/store";
import { selectToken } from "../redux/authSlice";
import { PointsService } from "../services/pointsService";

const Points = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
    } = useForm();

    const token = useSelector(selectToken);
    const handlePoint = async () => {
        const point = {
            x: getValues("x")[0],
            y: getValues("y"),
            r: getValues("r")[0],

            result: true,
            time: 0,
            executionTime: 0,
        };
        console.log(point);
        const pointData = await PointsService.addPoint(token, point);

        if (pointData) {
            if (pointData.message) {
                console.log(pointData.message);
            } else {
                console.log(pointData);
            }
        }
    };

    const deletePoints = async () => {
        const pointData = await PointsService.deletePoints(token);
        if (pointData) {
            if (pointData.message) {
                console.log(pointData.message);
            } else {
                console.log(pointData);
            }
        }
    };

    const handleCheckboxChange = (name, value) => {
        setValue(name, value);
    };

    return (
        <div>
            <h1>Points</h1>

            <form onSubmit={handleSubmit(handlePoint)}>
                <label htmlFor="x">X</label>
                {["-4", "-3", "-2", "-1", "0", "1", "2", "3", "4"].map(
                    (value) => (
                        <label key={value}>
                            <input
                                type="checkbox"
                                name="x"
                                value={value}
                                {...register("x", {
                                    required: "x is required",
                                })}
                                onChange={() =>
                                    handleCheckboxChange("x", value)
                                }
                            />
                            {value}
                        </label>
                    )
                )}
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
                {["-4", "-3", "-2", "-1", "0", "1", "2", "3", "4"].map(
                    (value) => (
                        <label key={value}>
                            <input
                                type="checkbox"
                                name="r"
                                value={value}
                                {...register("r", {
                                    required: "r is required",
                                })}
                                onChange={() =>
                                    handleCheckboxChange("r", value)
                                }
                            />
                            {value}
                        </label>
                    )
                )}
                <br />
                <button type="submit">Add</button>
            </form>
            <button onClick={deletePoints}>Delete</button>
        </div>
    );
};

export default Points;
