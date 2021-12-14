package com.mahadi.restapi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "recipe")
@Data
public class Recipe extends BaseModel {
    private String recipeName;
    private String instruction;
    private String nutritionValue;
    private Integer ratings;
    private String comments;
    private String chef;
    @ManyToOne
    @JoinColumn(name = "menu_id", nullable = false)
    @JsonIgnore
    @ToString.Exclude
    private Menu menu;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "recipe_ingredients", joinColumns = @JoinColumn(name = "recipe_id"), inverseJoinColumns = @JoinColumn(name = "ingredient_id"))
    @ToString.Exclude
    private List<Ingredients> ingredients ;
    @OneToMany(mappedBy = "recipe")
    @JsonIgnore
    private List<IngredientsQty> ingredientsQuantyties;



}
