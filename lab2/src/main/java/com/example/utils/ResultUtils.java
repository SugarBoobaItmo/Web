package com.example.utils;

import com.example.db.DAOFactory;
import com.example.entity.PointsResultEntity;

public class ResultUtils {

    public static void addResult(final double x, final double y, final double r) {
        PointsResultEntity point = new PointsResultEntity();
        point.setX(x);
        point.setY(y);
        point.setR(r);

        DAOFactory.getInstance().getResultDAO().addNewResult(point);
    }
}