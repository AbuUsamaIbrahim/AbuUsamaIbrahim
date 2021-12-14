package com.mahadi.restapi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "ingredients")
@Data
public class Ingredients extends BaseModel{
    private String name;
    private String amountInSpoon;
    @ManyToMany(mappedBy = "ingredients")
    @JsonIgnore
    private List<Recipe>recipes = new ArrayList<>();
}
