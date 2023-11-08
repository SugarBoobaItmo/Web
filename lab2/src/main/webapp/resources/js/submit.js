function submitForm(x, y, r) {
    const urlParams = new URLSearchParams({
        x: x,
        y: y,
        r: r,
    });

    fetch("controller?" + urlParams.toString(), {
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((result) => {
            updateResults(r, result);
        })
        .catch((error) => {
            console.error(error);
        });
}

function submitR(r) {
    const urlParams = new URLSearchParams({
        r: r,
    });

    fetch("controller?" + urlParams.toString(), {
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((result) => {
            updateResults(r, result);
        })
        .catch((error) => {
            console.error(error);
        });
}

function updateResults(r, result) {
    let tbody = document.getElementById("results");

    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    for (i = 0; i < result.length; i++) {
        let row = tbody.insertRow(i);
        let x_cell = row.insertCell(0);
        let y_cell = row.insertCell(1);
        let r_cell = row.insertCell(2);
        let result_cell = row.insertCell(3);

        x_cell.innerHTML = result[i].x;
        y_cell.innerHTML = result[i].y;
        r_cell.innerHTML = result[i].r;
        result_cell.innerHTML = result[i].check;
    }

    drawGraph(r, result);
}
