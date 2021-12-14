package com.mahadi.restapi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Data
public class IngredientsQty extends BaseModel {
    private String ingredientsName;
    private String ingredientsQty;
    @ManyToOne
    @JoinColumn(name = "recipeId",nullable = false)
    @JsonIgnore
    @ToString.Exclude
    private Recipe recipe;
}
