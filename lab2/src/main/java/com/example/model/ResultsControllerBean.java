package com.example.model;


import jakarta.annotation.PostConstruct;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;

import com.example.db.DAOFactory;
import com.example.entity.PointsResultEntity;
import com.example.utils.ResultUtils;

public class ResultsControllerBean implements Serializable {
    private XBean xBean;
    private ArrayList<Double> results = new ArrayList<>();

    @PostConstruct
    public void init() {
        Collection<PointsResultEntity> resultsEntities = DAOFactory.getInstance().getResultDAO().getAllResults();
        for (PointsResultEntity result : resultsEntities) {
            results.add(result.getX());
        }
    }


    public void addResult(Double x) {
        results.add(x);
        // add to db
        ResultUtils.addResult(x);
    }

    public XBean getXBean() {
        return xBean;
    }

    public void setxBean(XBean xBean) {
        this.xBean = xBean;
    }

    public void setXBean(XBean xBean) {
        this.xBean = xBean;
    }

    public ArrayList<Double> getResults() {
        return results;
    }

    public void setResults(ArrayList<Double> results) {
        this.results = results;
    }
}
