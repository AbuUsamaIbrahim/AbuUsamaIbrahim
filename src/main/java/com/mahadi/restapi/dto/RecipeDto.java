package com.mahadi.restapi.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.util.List;

@Data
public class RecipeDto {
    private Long id;
    private String recipeName;
    private String instruction;
    private String nutritionValue;
    private Integer ratings;
    private String comments;
    private String chef;
    private MenuDto menu;
    private List<IngredientsDto> ingredients ;
}
