package com.example.model;

import jakarta.annotation.PostConstruct;
import jakarta.faces.context.ExternalContext;
import jakarta.faces.context.FacesContext;
import jakarta.inject.Inject;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Getter;
import lombok.Setter;

import java.io.IOException;
import java.io.Serializable;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collection;

import com.example.db.ResultDAO;
import com.example.entity.PointsResultEntity;
import com.example.utils.AreaValidator;

@Getter
@Setter
public class ResultsControllerBean implements Serializable {
    private XBean xBean;
    private YBean yBean;
    private RBean rBean;
    private Collection<PointsResultEntity> results = new ArrayList<>();

    @Inject
    private ResultDAO resultDAO;

    @PostConstruct
    public void init() {
        results = resultDAO.getAllResults();
    }

    public void addResult(Double x, Double y, Double r) {
        PointsResultEntity point = new PointsResultEntity();

        final long start = System.nanoTime();

        point.setX(x);
        point.setY(y);
        point.setR(r);
        point.setTime(java.time.LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss")));
        boolean result = AreaValidator.checkArea(x, y, r);
        point.setResult(result);
        point.setExecutionTime(String.format("%.9f", (System.nanoTime() - start) / 1000000000.0));

        resultDAO.addNewResult(point);
        results.add(point);

        yBean.setValue(0.0);
        xBean.setValue(0.0);
    }

    public void updateR(Double r) {
        for (PointsResultEntity point : results) {
            point.setR(r);
            point.setResult(AreaValidator.checkArea(point.getX(), point.getY(), r));

        }
    }

    public void clearResults() {
        results.clear();
        resultDAO.clearResults();
        // ExternalContext ec = FacesContext.getCurrentInstance().getExternalContext();
        // try {
        // ec.redirect(((HttpServletRequest) ec.getRequest()).getRequestURI());
        // } catch (IOException e) {
        // e.printStackTrace();
        // }
    }
}
