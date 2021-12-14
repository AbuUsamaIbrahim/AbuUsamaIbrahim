package com.mahadi.restapi.controller;

import com.mahadi.restapi.annotations.ApiController;
import com.mahadi.restapi.annotations.DataValidation;
import com.mahadi.restapi.dto.RecipeDto;
import com.mahadi.restapi.dto.Response;
import com.mahadi.restapi.service.RecipeService;
import com.mahadi.restapi.util.UrlConstants;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@ApiController
@RequestMapping(UrlConstants.RecipeManagement.ROOT)
public class RecipeController {
    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @PostMapping(UrlConstants.MenuManagement.CREATE)
    @DataValidation
    public Response create(@RequestBody @Valid RecipeDto recipeDto, BindingResult result, HttpServletRequest
            request, HttpServletResponse response) {
        return recipeService.create(recipeDto);
    }
    @PutMapping(UrlConstants.MenuManagement.UPDATE)
    @DataValidation
    public Response update(@PathVariable Long id, @RequestBody @Valid RecipeDto recipeDto, BindingResult result, HttpServletRequest request, HttpServletResponse response) {
        return recipeService.update(id,recipeDto);
    }
    @DeleteMapping(UrlConstants.MenuManagement.DELETE)
    public Response delete(@PathVariable("id") Long id,HttpServletResponse response,HttpServletRequest request){
        return recipeService.delete(id);
    }
    @GetMapping(UrlConstants.MenuManagement.GET)
    public Response get(@PathVariable Long id,HttpServletResponse response,HttpServletRequest request){
        return recipeService.get(id);
    }
    @GetMapping(UrlConstants.MenuManagement.GET_ALL)
    public Response getAll(HttpServletResponse httpServletResponse, Pageable pageable,
                           @RequestParam(value = "export", defaultValue = "false") boolean isExport,
                           @RequestParam(value = "search", defaultValue = "") String search,
                           @RequestParam(value = "status", defaultValue = "") String status) {
        return recipeService.getAll(pageable,isExport,search,status);
    }

}
