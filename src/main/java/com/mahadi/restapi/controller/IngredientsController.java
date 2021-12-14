package com.mahadi.restapi.controller;

import com.mahadi.restapi.annotations.ApiController;
import com.mahadi.restapi.annotations.DataValidation;
import com.mahadi.restapi.dto.IngredientsDto;
import com.mahadi.restapi.dto.Response;
import com.mahadi.restapi.service.IngredientService;
import com.mahadi.restapi.util.UrlConstants;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@ApiController
@RequestMapping(UrlConstants.IngredientsManagement.ROOT)
public class IngredientsController {
    private final IngredientService ingredientService;
    public IngredientsController(IngredientService ingredientService){
        this.ingredientService=ingredientService;
    }
    @PostMapping(UrlConstants.MenuManagement.CREATE)
    @DataValidation
    public Response create(@RequestBody @Valid IngredientsDto ingredientsDto, BindingResult result, HttpServletRequest
            request, HttpServletResponse response) {
        return ingredientService.create(ingredientsDto);
    }
    @PutMapping(UrlConstants.MenuManagement.UPDATE)
    @DataValidation
    public Response update(@PathVariable Long id, @RequestBody @Valid IngredientsDto recipeDto, BindingResult result, HttpServletRequest request, HttpServletResponse response) {
        return ingredientService.update(id,recipeDto);
    }
    @DeleteMapping(UrlConstants.MenuManagement.DELETE)
    public Response delete(@PathVariable("id") Long id,HttpServletResponse response,HttpServletRequest request){
        return ingredientService.delete(id);
    }
    @GetMapping(UrlConstants.MenuManagement.GET)
    public Response get(@PathVariable Long id,HttpServletResponse response,HttpServletRequest request){
        return ingredientService.get(id);
    }
    @GetMapping(UrlConstants.MenuManagement.GET_ALL)
    public Response getAll(HttpServletResponse httpServletResponse, Pageable pageable,
                           @RequestParam(value = "export", defaultValue = "false") boolean isExport,
                           @RequestParam(value = "search", defaultValue = "") String search,
                           @RequestParam(value = "status", defaultValue = "") String status) {
        return ingredientService.getAll(pageable,isExport,search,status);
    }
}
