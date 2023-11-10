package com.example.utils;

import com.example.db.DAOFactory;
import com.example.entity.PointsResultEntity;

public class ResultUtils {

    public static void addResult(final double x) {
        PointsResultEntity point = new PointsResultEntity();
        point.setX(x);

        DAOFactory.getInstance().getResultDAO().addNewResult(point);
    }
}