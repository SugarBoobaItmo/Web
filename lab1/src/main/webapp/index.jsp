<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <title>Labwork 1</title>
    <link rel="shortcut icon" href="./img/test.png" type="image/x-icon" />
    <link rel="stylesheet" href="./css/style.css" />

</head>

<body onload="drawGraph(1,[]);">
    <header>
        <p>by Khabner Georgiiiiiiiiiiiiiiiy Evgenievich P3231</p>
        <p>Variant: 8888355</p>

    </header>
    <table>
        <tbody>
            <tr>
                <td>
                    <div id="form">
                        <jsp:include page="form.jsp" />
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div id="graph">
                        <jsp:include page="graph.jsp" />
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div id="resultsTable">
                        <jsp:include page="table.jsp" />
                    </div>
                </td>
            </tr>
        </tbody>
    </table>

    <script src="./js/validate.js"></script>
    <script src="./js/drawer.js"></script>
    <script src="./js/submit.js"></script>
    
</body>

</html>