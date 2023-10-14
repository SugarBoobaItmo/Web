<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <title>Form</title>
    <link rel="shortcut icon" href="./img/test.png" type="image/x-icon" />
    <link rel="stylesheet" href="./css/style.css" />

</head>
<body>
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
                            <option value="1.5">1.5</option>
                            <option value="2">2</option>
                            <option value="2.5">2.5</option>
                            <option value="3">3</option>
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

    <script>
        const selectEelement = document.getElementById("r");
        selectEelement.addEventListener("change", () => {
        submitR(selectEelement.value);
        });
    </script>
    <script src="./js/submit.js"></script>



</body>