import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { PointsService } from "../../services/pointsService";
import PointsTable from "../../components/PointsTable/PointsTable";
import { useDispatch } from "react-redux";
import { setPoints, setR } from "../../redux/pointsSlice";
import { useState } from "react";
import Graph from "../../components/Graph/Graph";
import { logout } from "../../redux/authSlice";
import PointsForm from "../../components/PointsForm/PointsForm";
import { getToken } from "../../token";
import Header from "../../components/Header/Header";

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
        const pointData = await PointsService.addPoint(getToken(), point);

        if (pointData) {
            if (pointData.message) {
                setError(pointData.message);
            } else {
                dispatch(setPoints(pointData));
            }
        }
    };

    const deletePoints = async () => {
        const pointData = await PointsService.deletePoints(getToken());
        if (pointData) {
            if (pointData.message) {
                setError(pointData.message);
            } else {
                dispatch(setPoints(pointData));
            }
        }
    };

    const handleRChange = async (value) => {
        dispatch(setR(value));
        const pointData = await PointsService.changeArea(getToken(), value);
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
            <Header />
            <PointsForm onSubmit={handlePoint} onDelete={deletePoints} onRChange={handleRChange} error={error} />
            <Graph width={600} />
            <PointsTable />
        </div>
    );
};

export default Points;
