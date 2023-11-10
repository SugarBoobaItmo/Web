package com.example.model;


import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;

import com.example.db.DAOFactory;
import com.example.entity.PointsResultEntity;
import com.example.utils.ResultUtils;

@Getter
@Setter
public class ResultsControllerBean implements Serializable {
    private XBean xBean;
    private YBean yBean;
    private RBean rBean;
    private ArrayList<Double> results = new ArrayList<>();

    @PostConstruct
    public void init() {
        Collection<PointsResultEntity> resultsEntities = DAOFactory.getInstance().getResultDAO().getAllResults();
        for (PointsResultEntity result : resultsEntities) {
            results.add(result.getX());
            results.add(result.getY());
            results.add(result.getR());
        }
    }


    public void addResult(Double x, Double y, Double r) {
        results.add(x);
        results.add(y);
        results.add(r);
        // add to db
        ResultUtils.addResult(x, y, r);
    }

}
