package model;

public class Point {
    private double x;
    private double y;
    private double r;
    private boolean check;
    private String time;
    private long exec_time;

    public Point(double x, double y, double r, boolean check, String time, long exec_time) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.check = check;
        this.time = time;
        this.exec_time = exec_time;

    }

    public Point() {
        this.x = 0;
        this.y = 0;
        this.r = 0;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public boolean getCheck() {
        return check;
    }

    public String getTime() {
        return time;
    }

    public long getExec_time() {
        return exec_time;
    }

    public void setCheck(boolean check) {
        this.check = check;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public void setExec_time(long exec_time) {
        this.exec_time = exec_time;
    }

    public void setX(double x) {
        this.x = x;
    }

    public void setY(double y) {
        this.y = y;
    }

    public void setR(double r) {
        this.r = r;
    }

    @Override
    public String toString() {
        return "<tr>" + "<td>" + x + "</td>" + "<td>" + y + "</td>" + "<td>" + r + "</td>" + "<td>" + check + "</td>"
                + "<td>" + time + "</td>" + "<td>" + exec_time + "</td>" + "</tr>";
    }

}
