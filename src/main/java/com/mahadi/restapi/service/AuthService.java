package com.mahadi.restapi.service;

import com.mahadi.restapi.dto.LoginRequestDto;
import com.mahadi.restapi.dto.Response;

public interface AuthService {
    Response login(LoginRequestDto loginRequestDto);

    Response logout(LoginRequestDto loginRequestDto);
}
