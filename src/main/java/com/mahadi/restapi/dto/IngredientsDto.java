package com.mahadi.restapi.dto;

import lombok.Data;

@Data
public class IngredientsDto {
    private Long id;
    private String name;
    private String amountInSpoon;
}
