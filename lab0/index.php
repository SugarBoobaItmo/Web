<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Labwork 1</title>
    <!-- add page icon -->
    <link rel="shortcut icon" href="img/test.png" type="image/x-icon" />

    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            background-image: url("img/bg.jpg");
            background-repeat: no-repeat;
            background-size: cover;
            /* This will make the image cover the entire background */
            background-attachment: fixed;
            /* This will make the image fixed when scrolling */
            background-position: center center;
            color: rgb(164, 140, 255);

        }

        table {
            margin: auto;
            margin-top: 20px;
            border-collapse: collapse;
            width: 80%;
            max-width: 800px;
            /* background color should be transparent */
            background-color: rgba(255, 255, 255, 0.3);


            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

        }

        th,
        td {
            padding: 10px;
            text-align: left;
            border: 1px solid #dddddd;
        }

        header {
            font-family: fantasy;
            font-weight: normal;
            font-size: 14px;
            margin: 20px auto;
            color: rgb(0, 0, 0, 0.3);

        }

        header p {
            margin: 0;
        }

        input[type="radio"] {
            margin-right: 1%;
        }

        select {
            width: 50%;
            padding: 5px;
            box-sizing: content-box;
        }

        input[type="text"] {
            width: 50%;
            padding: 5px;
            box-sizing: content-box;
        }

        #button {
            padding: 5px 40px;
            background-color: rgb(164, 140, 255);
            color: white;
            border: none;
            cursor: pointer;
        }

        input[type="button"]:hover {
            background-color: rgb(164, 100, 255);
        }

        .canvas{
            margin-left: 10%;
        }

        .error {
            color: red;
            display: inline;
            font-size: 12px;
        }
    </style>
</head>

<body onload="drawGraph(1);">
    <header>
        <p>by Khabner Georgiy Evgenievich P3231</p>
        <p>Variant: 1214</p>

    </header>
    <table>
        <tbody>
            <tr>
                <td>
                    <form>
                        <table>
                            <thead>
                                <tr>
                                    <th colspan="2">Please enter your parameters</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        X:
                                    </td>
                                    <td>
                                        <label>
                                            <input type="radio" name="x" value="-4" id="-4">-4
                                        </label>
                                        <label>
                                            <input type="radio" name="x" value="-3" id="-3">-3
                                        </label>
                                        <label>
                                            <input type="radio" name="x" value="-2" id="-2">-2
                                        </label>
                                        <label>
                                            <input type="radio" name="x" value="-1" id="-1">-1
                                        </label>
                                        <label>
                                            <input type="radio" name="x" value="0" id="0">0
                                        </label>
                                        <label>
                                            <input type="radio" name="x" value="1" id="1">1
                                        </label>
                                        <label>
                                            <input type="radio" name="x" value="2" id="2">2
                                        </label>
                                        <label>
                                            <input type="radio" name="x" value="3" id="3">3
                                        </label>
                                        <label>
                                            <input type="radio" name="x" value="4" id="4">4
                                        </label>

                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Y:
                                    </td>
                                    <td>
                                        <input type="text" name="y" id="y" maxlength="8" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        R:
                                    </td>
                                    <td>
                                        <select name="r" id="r">
                                            <option value="1" selected>1</option>
                                            <option value="2">2</option>
                                            <option value="3">
                                                3
                                            </option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" id="post_cell">
                                        <input type="submit" value="Post" id="button" onclick="valid(); return false;"/>
                                        <p class="error" id="error"> </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </td>
            </tr>
            <tr>
                <td>
                    <canvas id="canvas" width="700px" height="700px" class="canvas"></canvas>
                </td>
            </tr>
            <tr>
                <td>
                    <table id="resultsTable">
                        <thead>
                            <tr>
                                <th>X</th>
                                <th>Y</th>
                                <th>R</th>
                                <th>Result</th>
                                <th>Time</th>
                                <th>Execution time</th>
                            </tr>
                        </thead>
                        <tbody id="results">
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
    <!-- connect js file -->
    <script src="js/validate.js"></script>
    <script src="js/drawer.js"></script>
    <script src="js/submit.js"></script>

    <script>
        const selectEelement = document.getElementById('r');
        selectEelement.addEventListener('change', () => drawGraph(selectEelement.value));
    </script>




</body>

</html>