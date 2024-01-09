import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { setPoints } from "../../redux/pointsSlice";
import { PointsService } from "../../services/pointsService";
import { drawGraph } from "../../services/graphService";
import styles from "./Graph.module.css";

const Graph = ({width}) => {
    const canvasRef = useRef(null)
    const dispatch = useDispatch()

    const points = useSelector((state) => state.points.points);
    const r = useSelector((state) => state.points.r);
    
    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        drawGraph(r, points, ctx, width)

    }, [points, r])

    const handleCanvasClick = async (e) => {

        const canvas = canvasRef.current
        const rect = canvas.getBoundingClientRect()
        
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const x_res = (x - width / 2) / (width / 20) * r / 2;
        const y_res = (width / 2 - y) / (width / 20) * r / 2;
        
        const point = {
            x: x_res.toFixed(2),
            y: y_res.toFixed(2),
            r: r,
            result: true,
            time: 0,
            executionTime: 0,
        };

        const pointData = await PointsService.addPoint(localStorage.getItem("token"), point)

        if (pointData) {
            if (!pointData.message) {
                dispatch(setPoints(pointData));
            }
        }
    }

    return (
        <div className="graph">
            <canvas id="canvas" width={width} height={width} ref={canvasRef} onClick={handleCanvasClick} className={styles.graph__canvas}></canvas>
        </div>
    );
};

export default Graph;