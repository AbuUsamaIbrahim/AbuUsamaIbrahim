package com.mahadi.restapi.service;

import com.mahadi.restapi.dto.IngredientsDto;
import com.mahadi.restapi.dto.MenuDto;
import com.mahadi.restapi.dto.Response;
import com.mahadi.restapi.model.Ingredients;
import org.springframework.data.domain.Pageable;

public interface IngredientService {
    Response create(IngredientsDto ingredientsDto);

    Response update(Long id, IngredientsDto ingredientsDto);

    Response delete(Long id);

    Response get(Long id);

    Response getAll(Pageable pageable, boolean isExport, String search, String status);

}
