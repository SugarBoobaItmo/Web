const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = 800;
const y_point = width / 2;
const x_point = width / 2;

function drawPoint(x, y, r, color) {
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

function drawGraph(r, points) {
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
    for (i = 1; i < 7; i++) {
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
    ctx.arc(x_point, y_point, (width / 20), 4.7, (2 * Math.PI) / 2, true);
    ctx.fill();

    // triangle part
    ctx.moveTo(x_point, y_point);
    ctx.lineTo(x_point - (width / 20), y_point);
    ctx.lineTo(x_point, y_point + (width / 20));
    ctx.fill();

    // rectangle part
    ctx.fillRect(x_point, y_point, (width / 20) * 2, (width / 20) * 2);

    // paint black border for rectangle
    ctx.moveTo(x_point + (width / 20) * 2, y_point);
    ctx.lineTo(x_point, y_point);
    ctx.lineTo(x_point, y_point + (width / 20) * 2);
    ctx.lineTo(x_point + (width / 20) * 2, y_point + (width / 20) * 2);
    ctx.lineTo(x_point + (width / 20) * 2, y_point);

    ctx.strokeStyle = "black";
    ctx.stroke();

    if (points.length == 0) {
        return;
    }
    for (let i = 0; i < points.length; i++) {
        x_res = points[i].x;
        y_res = points[i].y;
        r_res = points[i].r;

        if (points[i].check) {
            color = "green";
        } else {
            color = "red";
        }
        drawPoint(x_res, y_res, r, color);
    }
}

canvas.addEventListener("click", function (event) {
    const rect = canvas.getBoundingClientRect();

    var r = document.getElementById("r").value;
    if (1 <= r && r <= 3) {
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        x = (x - x_point) / (width / 20)*r/2;

        x = x.toFixed(0);
        if (x == 0) {
            x = 0;
        }

        y = (y_point - y) / (width / 20)*r/2;
        y = y.toFixed(2);

        var radio_buttons = document.getElementsByName("x");
        for (var i = 0; i < radio_buttons.length; i++) {
            if (radio_buttons[i].value == x) {
                radio_buttons[i].checked = true;
            } else {
                radio_buttons[i].checked = false;
            }
        }
        document.getElementById("y").value = y;

        document.getElementById("button").click();
    } else {
        alert("Please, choose R");
    }
});
