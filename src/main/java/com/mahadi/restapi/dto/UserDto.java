package com.mahadi.restapi.dto;

import lombok.Data;

import java.util.List;

@Data
public class UserDto {

    private Long id;
    private String name;
    private String email;
    private String employeeId;
    private String phoneNo;
    private String username;
    private String password;
    private List<RoleDto> roles;
}
