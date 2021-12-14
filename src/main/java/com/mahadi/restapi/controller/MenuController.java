package com.mahadi.restapi.controller;


import com.mahadi.restapi.annotations.ApiController;
import com.mahadi.restapi.annotations.DataValidation;
import com.mahadi.restapi.dto.MenuDto;
import com.mahadi.restapi.dto.Response;
import com.mahadi.restapi.service.MenuService;
import com.mahadi.restapi.util.UrlConstants;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@ApiController
@RequestMapping(UrlConstants.MenuManagement.ROOT)
public class MenuController {
    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @PostMapping(UrlConstants.MenuManagement.CREATE)
    @DataValidation
    public Response create(@RequestBody @Valid MenuDto menuDto, BindingResult result, HttpServletRequest request, HttpServletResponse response) {
        return menuService.create(menuDto);
    }
    @PutMapping(UrlConstants.MenuManagement.UPDATE)
    @DataValidation
    public Response update(@PathVariable Long id, @RequestBody @Valid MenuDto menuDto, BindingResult result, HttpServletRequest request, HttpServletResponse response) {
        return menuService.update(id,menuDto);
    }
    @DeleteMapping(UrlConstants.MenuManagement.DELETE)
    public Response delete(@PathVariable("id") Long id,HttpServletResponse response,HttpServletRequest request){
        return menuService.delete(id);
    }
    @GetMapping(UrlConstants.MenuManagement.GET)
    public Response get(@PathVariable Long id,HttpServletResponse response,HttpServletRequest request){
        return menuService.get(id);
    }
    @GetMapping(UrlConstants.MenuManagement.GET_ALL)
    public Response getAll(HttpServletResponse httpServletResponse, Pageable pageable,
                        @RequestParam(value = "export", defaultValue = "false") boolean isExport,
                        @RequestParam(value = "search", defaultValue = "") String search,
                        @RequestParam(value = "status", defaultValue = "") String status) {
        return menuService.getAll(pageable,isExport,search,status);
    }

}
