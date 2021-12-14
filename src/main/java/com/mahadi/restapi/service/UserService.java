package com.mahadi.restapi.service;

import com.mahadi.restapi.dto.ResetPasswordDto;
import com.mahadi.restapi.dto.Response;
import com.mahadi.restapi.dto.UserDto;
import com.mahadi.restapi.model.User;
import org.springframework.data.domain.Pageable;

public interface UserService {
    User getUserByEmailOrUserName(String emailOrUserName);

    Response create(UserDto userDto);

    Response update(Long id, UserDto userDto);

    Response delete(Long id);

    Response get(Long id);

    Response getAll(Pageable pageable, boolean isExport, String search, String status);
//    void deleteAllExpiredToken();
//    Response createForgotPasswordRequest(ForgotPasswordRequestDto forgotPasswordRequestDto);

//    Response changeForgottenPassword(ForgotPasswordDto forgotPasswordDto);

    Response resetPassword(ResetPasswordDto resetPasswordDto);
}
