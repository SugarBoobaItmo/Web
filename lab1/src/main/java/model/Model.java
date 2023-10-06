package model;

import java.util.ArrayList;

public class Model {
    private ArrayList<Point> points = new ArrayList<>();

    public void addPoint(Point point) {
        points.add(point);
    }

    public Point getPoint(int index) {
        return points.get(index);
    }

    public int getPointsSize() {
        return points.size();
    }

    public void setPoints(ArrayList<Point> points) {
        this.points = points;
    }
    
}
