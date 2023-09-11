function valid() {
    var radio_buttons = document.getElementsByName("x");
    var x = 0;
    for (var i = 0; i < radio_buttons.length; i++) {
        if (radio_buttons[i].checked) {
            x = radio_buttons[i].value;
        }
    }

    var y = document.getElementById("y").value;
    var r = document.getElementById("r").value;

    if (x == "" || y == "" || r == "") {
        alert("Please fill all fields");

        return false;
    }

    if (isNaN(x) || isNaN(y) || isNaN(r)) {
        document.getElementById("y").value = "";
        document.getElementById("y").style.borderColor = "red";
        document.getElementById("y").placeholder = "should be a number";
        // alert("Please enter a valid number");

        return false;
    }

    if (y < -5 || y > 5) {
        document.getElementById("y").value = "";
        document.getElementById("y").style.borderColor = "red";
        document.getElementById("y").placeholder = "should be between -5 and 5";
        // alert("Please enter range for Y, it should be between -5 and 5");

        return false;
    }

    document.getElementById("y").style.borderColor = "black";
    document.getElementById("y").placeholder = "";
    drawGraph(r);
    drawPoint(x, y, r);
    submitForm();
    return true;
}
