function submitForm() {
    // Get the form data
    var radio_buttons = document.getElementsByName("x");
    var x = 0;
    for (var i = 0; i < radio_buttons.length; i++) {
        if (radio_buttons[i].checked) {
            x = radio_buttons[i].value;
        }
    }
    const y = document.getElementById("y").value;
    const r = document.getElementById("r").value;

    // Create a new XMLHttpRequest object
    // const xhr = new XMLHttpRequest();

    // // Define the callback function to handle the response
    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState === 4 && xhr.status === 200) {
    //         // Update the results table with the response data

    //         document.getElementById("results").innerHTML = xhr.responseText;
    //         clearForm();
    //     } else {
    //         console.log(xhr.responseText);
    //     }
    // };

    // Open a POST request to point_check.php
    // const time = new Date().toLocaleTimeString();
    
    // let url = "http://localhost:8080/lab1-1.0-SNAPSHOT/controller";
    // // url.searchParams.append("x", x);
    // // url.searchParams.append("y", y);
    // // url.searchParams.append("r", r);
    // let params = `x=${x}&y=${y}&r=${r}`;
    // xhr.open("GET", "/controller" + "?" + params, true);
    
    // xhr.open("GET", `ControllerServlet?x=${x}&y=${y}&r=${r}&time=${time}`, true);

    // xhr.send();

    const urlParams = new URLSearchParams({
        "x": x,
        "y": y,
        "r": r
    });
    window.location = window.location + "/controller?" + urlParams.toString();
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
