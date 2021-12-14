package com.mahadi.restapi.repository;

import com.mahadi.restapi.model.Menu;
import com.mahadi.restapi.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe,Long> {

    Recipe findByIdAndIsActiveTrue(Long id);
    Recipe findByIdAndMenuAndIsActiveTrue(Long id, Menu menuId);
    List<Recipe>findAllByMenuAndIsActiveTrue(Menu menuId);
    List<Recipe>findAllByIsActiveTrue();
}
