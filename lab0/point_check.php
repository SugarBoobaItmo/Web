<?php
session_start();
function chechPoint($x, $y, $r)
{
    return (((($x * $x + $y * $y) <= $r * $r && $x >= 0 && $y <= 0) ||
        ($y + $x <= $r && $x >= 0 && $y >= 0) ||
        ($x <= 0 && $y <= 0 && $x >= (-1) * $r && $y >= (-1) * $r)) && -5 <= $y && $y <= 5);
}

function validate($x, $y, $r)
{
    $max_len = 15;
    return is_numeric($x) && is_numeric($y) && is_numeric($r) && strlen($x) <= $max_len && strlen($y) <= $max_len && strlen($r) <= $max_len;
}


if ($_SERVER["REQUEST_METHOD"] === "GET") {

    if (isset($_GET["x"]) && isset($_GET["y"]) && isset($_GET["r"])) {
        $x = floatval($_GET["x"]);
        $y = floatval($_GET["y"]);
        $r = floatval($_GET["r"]);

        if (validate($x, $y, $r)) {
            $result = chechPoint($x, $y, $r) ? "Попадание" : "Промах";
            
            $currentTime = date("H:i:s");
            
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