package com.mahadi.restapi.controller;

import com.mahadi.restapi.annotations.ApiController;
import com.mahadi.restapi.annotations.DataValidation;
import com.mahadi.restapi.dto.LoginRequestDto;
import com.mahadi.restapi.dto.Response;
import com.mahadi.restapi.dto.UserDto;
import com.mahadi.restapi.service.AuthService;
import com.mahadi.restapi.service.UserService;
import com.mahadi.restapi.util.UrlConstants;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@ApiController
@RequestMapping(UrlConstants.AuthManagement.ROOT)
public class  AuthController {

    private final AuthService authService;
    private final UserService userService;

    public AuthController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping(UrlConstants.AuthManagement.LOGIN)
    public Response login(@Validated({LoginRequestDto.CreateValidation.class}) @RequestBody LoginRequestDto loginRequestDto, BindingResult bindingResults, HttpServletRequest request, HttpServletResponse httpServletResponse) {
        Response response = authService.login(loginRequestDto);
        httpServletResponse.setStatus(response.getStatusCode());
        return response;
    }

    @PostMapping(UrlConstants.UserManagement.CREATE)
    @DataValidation
    public Response create(@RequestBody @Valid UserDto userDto, BindingResult bindingResult, HttpServletResponse httpServletResponse, HttpServletRequest request) {
        return userService.create(userDto);
    }

    /*@PostMapping(UrlConstants.AuthManagement.FORGOT_PASSWORD)
    @DataValidation
    public Response forgotPassword(@RequestBody @Valid ForgotPasswordRequestDto forgotPasswordRequestDto, BindingResult bindingResult, HttpServletResponse httpServletResponse, HttpServletRequest request) {
        return userService.createForgotPasswordRequest(forgotPasswordRequestDto);
    }*/

    /*@PostMapping(UrlConstants.AuthManagement.CHANGE_PASSWORD)
    @DataValidation
    public Response changePassword(@RequestBody @Valid ForgotPasswordDto forgotPasswordDto, BindingResult bindingResult, HttpServletResponse httpServletResponse, HttpServletRequest request) {
        return userService.changeForgottenPassword(forgotPasswordDto);
    }*/
}
