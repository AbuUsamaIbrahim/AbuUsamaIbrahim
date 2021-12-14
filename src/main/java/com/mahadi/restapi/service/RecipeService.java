package com.mahadi.restapi.service;

import com.mahadi.restapi.dto.MenuDto;
import com.mahadi.restapi.dto.RecipeDto;
import com.mahadi.restapi.dto.Response;
import org.springframework.data.domain.Pageable;

public interface RecipeService {
    Response create(RecipeDto recipeDto);

    Response update(Long id, RecipeDto recipeDto);

    Response delete(Long id);

    Response get(Long id);

    Response getAll(Pageable pageable, boolean isExport, String search, String status);

}
