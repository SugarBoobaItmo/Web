package utils;

public class AreaValidator {
    public static boolean checkArea(double x, double y, double r) {
       
        return (checkSector(x, y, r) || checkTriangle(x, y, r) || checkSquare(x, y, r));        
    }

    public static boolean checkSector(double x, double y, double r) {
        return ((x * x + y * y) <= r * r && x >= 0 && y <= 0);
    }

    public static boolean checkTriangle(double x, double y, double r) {
        return (y + x <= r && x >= 0 && y >= 0);
    }

    public static boolean checkSquare(double x, double y, double r) {
        return (x <= 0 && y <= 0 && x >= (-1) * r && y >= (-1) * r);
    }
}
