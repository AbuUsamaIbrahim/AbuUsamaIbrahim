package com.mahadi.restapi.service;

import com.mahadi.restapi.dto.MenuDto;
import com.mahadi.restapi.dto.Response;
import org.springframework.data.domain.Pageable;

public interface MenuService {
    Response create(MenuDto menuDto);

    Response update(Long id, MenuDto menuDto);

    Response delete(Long id);

    Response get(Long id);

    Response getAll(Pageable pageable, boolean isExport, String search, String status);

    Response getAllMenuRecipe();
}
