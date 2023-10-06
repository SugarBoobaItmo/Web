package utils;

public class CoordinatesValidator {
    public static boolean validate(double x, double y, double r) {
        int maxLen = 8;

        boolean checkLen = String.valueOf(x).length() <= maxLen && String.valueOf(y).length() <= maxLen && String.valueOf(r).length() <= maxLen;
        boolean checkNum = Double.isFinite(x) && Double.isFinite(y) && Double.isFinite(r);
        
        return checkLen && checkNum && validateX(x) && validateY(y) && validateR(r);        

    }

    public static boolean validateR(double r) {
        return r > 0 && r <= 5;
    }

    public static boolean validateX(double x) {
        return x >= -4 && x <= 4;
    }

    public static boolean validateY(double y) {
        return y >= -5 && y <= 5;
    }

}
