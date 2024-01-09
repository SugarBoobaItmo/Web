import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { PointsService } from "../services/pointsService";
import PointsTable from "../components/PointsTable/PointsTable";
import { useDispatch } from "react-redux";
import { setPoints, setR } from "../redux/pointsSlice";
import { useState } from "react";
import Graph from "../components/Graph/Graph";

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

    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    
    const handlePoint = async () => {
        const point = {
            x: getValues("x")[0],
            y: getValues("y"),
            r: getValues("r")[0],
            result: true,
            time: 0,
            executionTime: 0,
        };
        const pointData = await PointsService.addPoint(localStorage.getItem("token"), point);

        if (pointData) {
            if (pointData.message) {
                setError(pointData.message);
            } else {
                dispatch(setPoints(pointData));
            }
        }
    };

    const deletePoints = async () => {
        const pointData = await PointsService.deletePoints(localStorage.getItem("token"));
        if (pointData) {
            if (pointData.message) {
                setError(pointData.message);
            } else {
                dispatch(setPoints(pointData));
            }
        }
    };

    const handleCheckboxChange = (name, value) => {
        setValue(name, value);
    };

    const handleRChange = async (value) => {
        setValue("r", value);
        dispatch(setR(value));
        const pointData = await PointsService.changeArea(localStorage.getItem("token"), value);
        if (pointData) {
            if (pointData.message) {
                setError(pointData.message);
            } else {
                dispatch(setPoints(pointData));
            }
        }

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
                                    handleRChange(value)
                                }
                            />
                            {value}
                        </label>
                    )
                )}
                <br />
                <button type="submit">Add</button>
                {error && <p>{error}</p>}
            </form>
            <button onClick={deletePoints}>Delete</button>
            <Graph width={600} />
            <PointsTable />
        </div>
    );
};

export default Points;
