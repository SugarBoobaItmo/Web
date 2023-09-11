const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = 600;
const y_point = width / 2;
const x_point = width / 2;

function drawPoint(x, y, r) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.moveTo(x_point, y_point);
    // ctx.arc(
    //     150 + (50 * parseInt(x)) / parseInt(r),
    //     70 - (50 * parseInt(y)) / parseInt(r),
    //     3,
    //     0,
    //     2 * Math.PI
    // );
    ctx.arc(
        x_point + (width / 20) * x,
        y_point - (width / 20) * y,
        3,
        0,
        2 * Math.PI
    );
    
    ctx.fill();
    ctx.closePath();
}

function drawGraph(r) {
    ctx.clearRect(0, 0, 1000, 1000);
    ctx.fillStyle = "rgba(91,95,201,0.58)";
    ctx.beginPath();
    

    // x line
    ctx.moveTo(x_point, y_point);
    ctx.lineTo(width / 6, y_point);
    ctx.moveTo(x_point, y_point);
    ctx.lineTo(width - width / 6, y_point);

    // y line
    ctx.moveTo(x_point, y_point);
    ctx.lineTo(x_point, width / 6);
    ctx.moveTo(x_point, y_point);
    ctx.lineTo(x_point, width - width / 6);

    // arrow x
    ctx.moveTo(width - width / 6, y_point);
    ctx.lineTo(width - width / 6 - 10, y_point - 5);
    ctx.moveTo(width - width / 6, y_point);
    ctx.lineTo(width - width / 6 - 10, y_point + 5);

    // arrow y
    ctx.moveTo(x_point, width / 6);
    ctx.lineTo(x_point - 5, width / 6 + 10);
    ctx.moveTo(x_point, width / 6);
    ctx.lineTo(x_point + 5, width / 6 + 10);

    // lines for x and y
    for (i = 1; i < 6; i++) {
        ctx.moveTo(x_point + (width / 20) * i, y_point + 10);
        ctx.lineTo(x_point + (width / 20) * i, y_point - 10);
        ctx.moveTo(x_point - (width / 20) * i, y_point + 10);
        ctx.lineTo(x_point - (width / 20) * i, y_point - 10);

        ctx.moveTo(x_point + 10, y_point + (width / 20) * i);
        ctx.lineTo(x_point - 10, y_point + (width / 20) * i);
        ctx.moveTo(x_point + 10, y_point - (width / 20) * i);
        ctx.lineTo(x_point - 10, y_point - (width / 20) * i);
    }

    // circle part
    ctx.moveTo(x_point, y_point);
    ctx.arc(x_point, y_point, (width / 20) * r, -4.7, (4 * Math.PI) / 2, true);
    ctx.fill();

    // triangle part
    ctx.moveTo(x_point, y_point);
    ctx.lineTo(x_point + (width / 20) * r, y_point);
    ctx.lineTo(x_point, y_point - (width / 20) * r);
    ctx.fill();

    // rectangle part
    ctx.fillRect(
        x_point - (width / 20) * r,
        y_point,
        (width / 20) * r,
        (width / 20) * r
    );

    // paint black border for rectangle
    ctx.moveTo(x_point - (width / 20) * r, y_point);
    ctx.lineTo(x_point, y_point);
    ctx.lineTo(x_point, y_point + (width / 20) * r);
    ctx.lineTo(x_point - (width / 20) * r, y_point + (width / 20) * r);
    ctx.lineTo(x_point - (width / 20) * r, y_point);


    ctx.strokeStyle = "black";
    ctx.stroke();
}
