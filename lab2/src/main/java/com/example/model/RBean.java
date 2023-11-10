package com.example.model;

import jakarta.faces.application.FacesMessage;
import jakarta.faces.validator.ValidatorException;
import lombok.Data;

import java.io.Serializable;

@Data
public class RBean implements Serializable {
    private Double RBeanValue = 0.0;


    public void validateXBeanValue(Object o){
        if (o == null){
            FacesMessage message = new FacesMessage("Input R!");
            throw new ValidatorException(message);
        }
    }

}