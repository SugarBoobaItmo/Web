function submitForm(x, y, r) {

    const urlParams = new URLSearchParams({
        "x": x,
        "y": y,
        "r": r
    });

    fetch("controller?" + urlParams.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
    .then(function (serverAnswer) {
        let tbody = document.getElementById("resultsTable");
        tbody.innerHTML = serverAnswer;
    })
    .catch(error => {
        console.error(error);
    });
     
}


function clearForm() {
    var radio_buttons = document.getElementsByName("x");
    for (var i = 0; i < radio_buttons.length; i++) {
        if (radio_buttons[i].checked) {
            radio_buttons[i].checked = false;
        }
    }
    document.getElementById('y').value = '';

}
