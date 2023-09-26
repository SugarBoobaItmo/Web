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
    const xhr = new XMLHttpRequest();

    // Define the callback function to handle the response
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Update the results table with the response data

            document.getElementById("results").innerHTML = xhr.responseText;
            clearForm();
        } else {
            console.log(xhr.responseText);
        }
    };

    // Open a POST request to point_check.php
    var time = new Date();
    time = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
    
    xhr.open("GET", `point_check.php?x=${x}&y=${y}&r=${r}&time=${time}`, true);

    xhr.send();
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
