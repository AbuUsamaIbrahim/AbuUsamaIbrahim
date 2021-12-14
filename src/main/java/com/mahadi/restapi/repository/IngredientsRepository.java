package com.mahadi.restapi.repository;

import com.mahadi.restapi.model.Ingredients;
import com.mahadi.restapi.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IngredientsRepository extends JpaRepository<Ingredients,Long> {
    Ingredients findByIdAndIsActiveTrue(Long id);
    List<Ingredients>findAllByRecipesAndIsActiveTrue(Recipe recipe_id);
    List<Ingredients>findAllByIsActiveTrue();
}
