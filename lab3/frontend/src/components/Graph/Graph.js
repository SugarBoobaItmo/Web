import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";

const Graph = ({width}) => {
    const canvasRef = useRef(null)

    const y_point = width / 2;
    const x_point = width / 2;


    const drawPoint = (x, y, r, color, ctx) => {
        ctx.fillStyle = color;
        
        ctx.beginPath();
        ctx.moveTo(x_point, y_point);
        ctx.arc(
            x_point + (width / 20) * x/r*2,
            y_point - (width / 20) * y/r*2,
            3,
            0,
            2 * Math.PI
        );
        ctx.fill();
        ctx.closePath();
    }

    const drawGraph = (r, points, ctx) => {
        ctx.clearRect(0, 0, 1000, 1000);
        ctx.fillStyle = "rgba(113,103,103,0.58)";
        ctx.beginPath();

        const line_width = 600;
        // x line
        ctx.moveTo(x_point, y_point);
        ctx.lineTo(width / line_width, y_point);
        ctx.moveTo(x_point, y_point);
        ctx.lineTo(width - width / line_width, y_point);

        // y line
        ctx.moveTo(x_point, y_point);
        ctx.lineTo(x_point, width / line_width);
        ctx.moveTo(x_point, y_point);
        ctx.lineTo(x_point, width - width / line_width);

        // arrow x
        ctx.moveTo(width - width / line_width, y_point);
        ctx.lineTo(width - width / line_width - 10, y_point - 5);
        ctx.moveTo(width - width / line_width, y_point);
        ctx.lineTo(width - width / line_width - 10, y_point + 5);

        // arrow y
        ctx.moveTo(x_point, width / line_width);
        ctx.lineTo(x_point - 5, width / line_width + 10);
        ctx.moveTo(x_point, width / line_width);
        ctx.lineTo(x_point + 5, width / line_width + 10);

        // lines for x and y
        for (let i = 1; i < 10; i++) {
            ctx.moveTo(x_point + (width / 20) * i, y_point + 10);
            ctx.lineTo(x_point + (width / 20) * i, y_point - 10);
            ctx.moveTo(x_point - (width / 20) * i, y_point + 10);
            ctx.lineTo(x_point - (width / 20) * i, y_point - 10);

            ctx.moveTo(x_point + 10, y_point + (width / 20) * i);
            ctx.lineTo(x_point - 10, y_point + (width / 20) * i);
            ctx.moveTo(x_point + 10, y_point - (width / 20) * i);
            ctx.lineTo(x_point - 10, y_point - (width / 20) * i);

            // print numbers for x
            ctx.font = "10px Arial";
            ctx.fillText(0.5*r*i, x_point + (width / 20) * i - 3, y_point + 20);
            ctx.fillText(-0.5*r*i, x_point - (width / 20) * i - 3, y_point + 20);
            // print numbers for y
            ctx.fillText(0.5*r*i, x_point - 20, y_point - (width / 20) * i + 3);
            ctx.fillText(-0.5*r*i, x_point - 20, y_point + (width / 20) * i + 3);
        }

        // circle part
        ctx.moveTo(x_point, y_point);
        ctx.arc(x_point, y_point, (width / 10), -4.7, -(4 * Math.PI) / 2, true);
        ctx.fill();

        // triangle part
        ctx.moveTo(x_point, y_point);
        ctx.lineTo(x_point - (width / 20), y_point);
        ctx.lineTo(x_point, y_point - (width / 20));
        ctx.fill();

        // rectangle part
        ctx.fillRect(x_point, y_point, (width / 20), -(width / 20) * 2);

        // paint black border for rectangle
        ctx.moveTo(x_point + (width / 20) * 2, y_point);
        ctx.lineTo(x_point, y_point);
        ctx.lineTo(x_point, y_point - (width / 20) * 2);
        ctx.lineTo(x_point + (width / 20) , y_point - (width / 20) * 2);
        ctx.lineTo(x_point + (width / 20) , y_point);

        ctx.strokeStyle = "black";
        ctx.stroke();

        if (points.length == 0) {
            return;
        }
        for (let i = 0; i < points.length; i++) {
            let x_res = points[i].x;
            let y_res = points[i].y;

            let color;
            if (points[i].result == "true") {
                color = "green";
            } else {
                color = "red";
            }
            drawPoint(x_res, y_res, r, color, ctx);
        }
    }

    const points = useSelector((state) => state.points.points);
    
    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        if (points.length == 0) {
            drawGraph(0, points, ctx)
        } else {
            drawGraph(points[points.length - 1].r, points, ctx)
        }

    }, [points])

    return (
        <div className="graph">
            <canvas id="canvas" width={width} height={width} ref={canvasRef}></canvas>
        </div>
    );
};

export default Graph;