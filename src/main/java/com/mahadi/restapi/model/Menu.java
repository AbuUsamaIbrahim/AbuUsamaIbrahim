package com.mahadi.restapi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;


import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

@Entity(name = "menu")
@Data
public class Menu extends BaseModel {

    private Integer weekNo;
    private String menuName;
    private Integer ratings;
    private String comments;
    @OneToMany(mappedBy = "menu")
    @JsonIgnore
    private List<Recipe> recipeList;


}
