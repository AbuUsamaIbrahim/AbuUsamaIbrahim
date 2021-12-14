package com.mahadi.restapi.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mahadi.restapi.model.Recipe;
import lombok.Data;

import java.util.List;

@Data
public class MenuDto {
    private Long id;
    private Integer weekNo;
    private String menuName;
    private Integer ratings;
    private String comments;
    @JsonIgnore
    private List<RecipeDto> recipeList;
}
