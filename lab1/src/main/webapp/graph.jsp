<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <title>Graph</title>
    <link rel="shortcut icon" href="./img/test.png" type="image/x-icon" />
    <link rel="stylesheet" href="./css/style.css" />

</head>

<body onload="drawGraph(1);">
    <canvas id="canvas" width="700px" height="700px" class="canvas"></canvas>
    <script>
        
        const selectEelement = document.getElementById('r');
        selectEelement.addEventListener('change', () => {
            drawGraph(selectEelement.value);
        });


    </script>

</body>
    
