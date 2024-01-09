package momsDeveloper.itmoweb.utils;

public class AreaValidator {
    public static boolean checkArea(double x, double y, double r) {
        return (checkSector(x, y, r) || checkTriangle(x, y, r) || checkSquare(x, y, r));
    }

    public static boolean checkSector(double x, double y, double r) {
        r = r / 2;
        if (r <= 0) {
            return ((x * x + y * y) <= r * r && x >= 0 && y >= 0);
        } else
            return ((x * x + y * y) <= r * r && x <= 0 && y <= 0);
    }

    public static boolean checkTriangle(double x, double y, double r) {
        if (r <= 0) {
            return ((-1)*x + y <= (-1)*r && x <= 0 && y >= 0);
        } else
            return (x + (-1) * y <= r && x >= 0 && y <= 0);
    }

    public static boolean checkSquare(double x, double y, double r) {
        if (r <= 0) {
            return (x >= 0 && y <= 0 && x <= (-1)*r / 2 && (-1) * y <= (-1)*r);
        } else
            return (x <= 0 && y >= 0 && (-1) * x <= r / 2 && y <= r);
    }
}
