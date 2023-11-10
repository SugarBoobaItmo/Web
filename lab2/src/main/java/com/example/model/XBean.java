package com.example.model;


import jakarta.faces.application.FacesMessage;
import jakarta.faces.validator.ValidatorException;
import lombok.Data;

import java.io.Serializable;

@Data
public class XBean implements Serializable {
    private Double XBeanValue = 0.0;


    public void validateXBeanValue(Object o){
        if (o == null){
            FacesMessage message = new FacesMessage("Input X!");
            throw new ValidatorException(message);
        }
    }

}
