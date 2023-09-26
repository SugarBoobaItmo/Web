<?php
session_start();
// check points in area
function chechPoint($x, $y, $r)
{   
    $check_sector = (($x * $x + $y * $y) <= $r * $r && $x >= 0 && $y <= 0);
    $check_triangle = ($y + $x <= $r && $x >= 0 && $y >= 0);
    $check_square = ($x <= 0 && $y <= 0 && $x >= (-1) * $r && $y >= (-1) * $r);
    $check_y = -5 <= $y && $y <= 5;
    return ($check_sector || $check_triangle || $check_square) && $check_y;
}

// validate input data 
function validate($x, $y, $r)
{   
    $max_len = 8;
    $check_len = strlen($x) <= $max_len && strlen($y) <= $max_len && strlen($r) <= $max_len;
    $check_num = is_numeric($x) && is_numeric($y) && is_numeric($r);
    $check_r = $r > 0 && $r <= 5;
    $check_x = $x >= -4 && $x <= 4;
    $check_y = $y >= -5 && $y <= 5;
    return $check_len && $check_num && $check_r && $check_x && $check_y;
}


if ($_SERVER["REQUEST_METHOD"] === "GET") {

    if (isset($_GET["x"]) && isset($_GET["y"]) && isset($_GET["r"])) {
        $x = floatval(str_replace(',', '.', $_GET["x"]));
        $y = floatval(str_replace(',', '.', $_GET["y"]));
        $r = floatval(str_replace(',', '.', $_GET["r"]));

        if (validate($x, $y, $r)) {
            $result = chechPoint($x, $y, $r) ? "Попадание" : "Промах";
            
            $currentTime = $_GET["time"];

            $executionTime = microtime(true) - $_SERVER["REQUEST_TIME_FLOAT"];
            // $executionTime = round(microtime(true) - $_SERVER["REQUEST_TIME_FLOAT"], 5);
            $_SESSION["results"][] = array("x" => $x, "y" => $y, "r" => $r, "result" => $result, "time" => $currentTime, "exec_time" => $executionTime);
            foreach ($_SESSION["results"] as $row) {
                echo "<tr>";
                foreach ($row as $cell) {
                    echo "<td>$cell</td>";
                }
                echo "</tr>";
            }
        } else {
            echo "<tr><td colspan='6'>Неверные данные 1</td></tr>";
        }
    } else {
        echo "<tr><td colspan='6'>Неверные данные 2</td></tr>";
    }
} else {
    echo "<tr><td colspan='6'>Неверные данные 3</td></tr>";
}

?>