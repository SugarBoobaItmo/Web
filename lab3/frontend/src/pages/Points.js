import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { PointsService } from "../services/pointsService";
import PointsTable from "../components/PointsTable/PointsTable";
import { useDispatch } from "react-redux";
import { setPoints, setR } from "../redux/pointsSlice";
import { useState } from "react";
import Graph from "../components/Graph/Graph";
import { logout } from "../redux/authSlice";
import PointsForm from "../components/PointsForm/PointsForm";

const Points = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
    });

    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    
    const handlePoint = async (x, y, r) => {
        const point = {
            x: x,
            y: y,
            r: r,
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
                console.log(pointData);

                dispatch(setPoints(pointData));
                console.log(pointData);
            }
        }
    };

    const handleRChange = async (value) => {
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

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div>
            <PointsForm onSubmit={handlePoint} onDelete={deletePoints} onRChange={handleRChange} error={error} />
            <button onClick={handleLogout}>Logout</button>
            <Graph width={600} />
            <PointsTable />
        </div>
    );
};

export default Points;
