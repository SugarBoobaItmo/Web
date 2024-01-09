import { useEffect } from "react";
import { useSelector } from "react-redux";
import { PointsService } from "../../services/pointsService";
import { useDispatch } from "react-redux";
import { setPoints } from "../../redux/pointsSlice";
import { getToken } from "../../token";
import styles from "./PointsTable.module.css";

const PointsTable = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const getPoints = async () => {
            const pointsData = await PointsService.getPoints(
                getToken()
            );
            if (pointsData) {
                if (!pointsData.message) dispatch(setPoints(pointsData));
            }
        };
        getPoints();
    }, [dispatch]);

    const points = useSelector((state) => state.points.points);

    return (
        <div className={styles.table}>
            <table>
                <thead>
                    <tr>
                        <th>X</th>
                        <th>Y</th>
                        <th>R</th>
                        <th>Result</th>
                        <th>Time</th>
                        <th>Execution Time</th>
                    </tr>
                </thead>
                <tbody>
                    {points.map((point, index) => (
                        <tr key={index}>
                            <td>{point.x}</td>
                            <td>{point.y}</td>
                            <td>{point.r}</td>
                            <td>{point.result ? "Ok" : "Not ok"}</td>
                            <td>{point.time}</td>
                            <td>{point.executionTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PointsTable;
