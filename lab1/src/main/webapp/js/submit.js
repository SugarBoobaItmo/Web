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

    const urlParams = new URLSearchParams({
        "x": x,
        "y": y,
        "r": r
    });
    const baseUrl = window.location.href.endsWith('/') ? window.location.href.slice(0, -1) : window.location.href;

    // Construct the final URL without double slashes
    const finalUrl = baseUrl + "?" + urlParams.toString();

    // Redirect to the final URL
    window.location.href = finalUrl;
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
