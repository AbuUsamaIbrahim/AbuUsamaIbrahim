package com.mahadi.restapi.controller;

import com.mahadi.restapi.annotations.ApiController;
import com.mahadi.restapi.annotations.DataValidation;
import com.mahadi.restapi.dto.ResetPasswordDto;
import com.mahadi.restapi.dto.Response;
import com.mahadi.restapi.dto.UserDto;
import com.mahadi.restapi.service.UserService;
import com.mahadi.restapi.util.UrlConstants;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@ApiController
@RequestMapping(UrlConstants.UserManagement.ROOT)
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(UrlConstants.UserManagement.CREATE)
    @DataValidation
    public Response create(@RequestBody @Valid UserDto userDto, BindingResult bindingResult, HttpServletResponse httpServletResponse, HttpServletRequest request) {
        return userService.create(userDto);
    }

    @PutMapping(UrlConstants.UserManagement.UPDATE)
    @DataValidation
    public Response update(@PathVariable("id") Long id, @RequestBody @Valid UserDto userDto, BindingResult bindingResult, HttpServletResponse httpServletResponse, HttpServletRequest request) {
        return userService.update(id, userDto);
    }

    @DeleteMapping(UrlConstants.UserManagement.DELETE)
    public Response delete(@PathVariable("id") Long id, HttpServletResponse httpServletResponse, HttpServletRequest request) {
        return userService.delete(id);
    }

    @GetMapping(UrlConstants.UserManagement.GET)
    public Response get(@PathVariable("id") Long id, HttpServletResponse httpServletResponse, HttpServletRequest request) {
        return userService.get(id);
    }

    @GetMapping(UrlConstants.UserManagement.GET_ALL)
    public Response getAll(HttpServletResponse httpServletResponse, Pageable pageable,
                           @RequestParam(value = "export", defaultValue = "false") boolean isExport,
                           @RequestParam(value = "search", defaultValue = "") String search,
                           @RequestParam(value = "status", defaultValue = "") String status, HttpServletRequest request) {

        return userService.getAll(pageable, isExport, search, status);
    }

    @PutMapping(UrlConstants.UserManagement.RESET_PASSWORD)
    @DataValidation
    public Response resetPassword(@RequestBody @Valid ResetPasswordDto resetPasswordDto, BindingResult bindingResult, HttpServletResponse httpServletResponse, HttpServletRequest request) {
        return userService.resetPassword(resetPasswordDto);
    }
}
