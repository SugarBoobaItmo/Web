<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="model.Model" %>
<%@ page import="model.Point" %>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <title>Labwork 1</title>
    <link rel="shortcut icon" href="./img/test.png" type="image/x-icon" />
    <link rel="stylesheet" href="./css/style.css" />

</head>

<body> 

        <table>
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
            <tbody>
                <% if (request.getSession().getAttribute("model") != null) { %>
                    <% Model model = (Model) request.getSession().getAttribute("model"); %>
                    <% for (int i = 0; i < model.getPointsSize(); i++) { %>
                            <% Point point = model.getPoint(i); %>
                        <tr class="point_row">
                            <td class="x_point"><%= point.getX() %></td>
                            <td class="y_point"><%= point.getY() %></td>
                            <td class="r_point"><%= point.getR() %></td>
                            <td class="result_point"><%= point.getCheck() %></td>
                            <td><%= point.getCheck() %></td>
                            <td><%= point.getTime() %></td>
                            <td><%= point.getExec_time() %></td>
                        </tr>
                    <% } %>
                <% } else { %>
                    <tr>
                        <td colspan="6">No results yet</td>
                    </tr>
                
                <% } %>
            </tbody>
        </table>
</body>
</html>