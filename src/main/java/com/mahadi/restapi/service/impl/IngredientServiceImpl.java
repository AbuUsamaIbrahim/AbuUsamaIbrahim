package com.mahadi.restapi.service.impl;

import com.mahadi.restapi.dto.IngredientsDto;
import com.mahadi.restapi.dto.RecipeDto;
import com.mahadi.restapi.dto.Response;
import com.mahadi.restapi.model.Ingredients;
import com.mahadi.restapi.model.Recipe;
import com.mahadi.restapi.repository.IngredientsRepository;
import com.mahadi.restapi.repository.MenuRepository;
import com.mahadi.restapi.repository.RecipeRepository;
import com.mahadi.restapi.service.IngredientService;
import com.mahadi.restapi.service.UtilityService;
import com.mahadi.restapi.util.ResponseBuilder;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Service("ingredientService")
public class IngredientServiceImpl implements IngredientService {
    private static final Logger logger = LogManager.getLogger(MenuServiceImpl.class.getName());
    private final MenuRepository menuRepository;
    private final RecipeRepository recipeRepository;
    private final String root = "Ingredients";
    private final UtilityService utilityService;
    private final ModelMapper modelMapper;
    private final IngredientsRepository ingredientsRepository;

    @PersistenceContext
    private EntityManager entityManager;

    public IngredientServiceImpl(MenuRepository menuRepository, RecipeRepository recipeRepository, UtilityService utilityService, ModelMapper modelMapper, EntityManager entityManager,IngredientsRepository ingredientsRepository) {
        this.menuRepository = menuRepository;
        this.recipeRepository = recipeRepository;
        this.utilityService = utilityService;
        this.modelMapper = modelMapper;
        this.entityManager = entityManager;
        this.ingredientsRepository = ingredientsRepository;
    }

    @Override
    @Transactional
    public Response create(IngredientsDto ingredientsDto) {
        Ingredients ingredients = modelMapper.map(ingredientsDto,Ingredients.class);
        return utilityService.getCreateResponse(ingredients,ingredientsRepository);
    }

    @Override
    @Transactional
    public Response update(Long id, IngredientsDto ingredientsDto) {
        Response notFoundFailureResponse = utilityService.getNullResponse(ingredientsRepository,id);
        if(notFoundFailureResponse != null){
            return notFoundFailureResponse;
        }
        try {
            Ingredients ingredients = utilityService.getById(ingredientsRepository,id);
            return utilityService.getUpdateResponse(ingredients,ingredientsDto,ingredientsRepository);
        }catch (NullPointerException e){
            logger.error(e.getMessage());
            return ResponseBuilder.getFailResponse(HttpStatus.BAD_REQUEST, e.getMessage());
        }catch (Exception e){
            logger.error(e.getMessage());
            return ResponseBuilder.getFailResponse(HttpStatus.BAD_REQUEST, e.getMessage());
        }

    }

    @Override
    @Transactional
    public Response delete(Long id) {
        Response notFoundFailureResponse = utilityService.getNullResponse(ingredientsRepository,id);
        if(notFoundFailureResponse != null){
            return notFoundFailureResponse;
        }
        try {
            Ingredients ingredients = utilityService.getById(ingredientsRepository,id);
            return utilityService.deleteEntityResponse(ingredients,ingredientsRepository);
        }catch (NullPointerException e){
            logger.error(e.getMessage());
            return ResponseBuilder.getFailResponse(HttpStatus.BAD_REQUEST, e.getMessage());
        }catch (Exception e){
            logger.error(e.getMessage());
            return ResponseBuilder.getFailResponse(HttpStatus.INTERNAL_SERVER_ERROR,e.getMessage());
        }
    }

    @Override
    @Transactional
    public Response get(Long id) {
        Response notFoundFailureResponse = utilityService.getNullResponse(recipeRepository,id);
        if(notFoundFailureResponse != null){
            return notFoundFailureResponse;
        }
        try {
            Ingredients ingredients = utilityService.getById(ingredientsRepository,id);
            IngredientsDto ingredientsDto = modelMapper.map(ingredients,IngredientsDto.class);
            return utilityService.getGetResponse(ingredientsDto,root);
        }catch (NullPointerException e){
            logger.error(e.getMessage());
            return ResponseBuilder.getFailResponse(HttpStatus.BAD_REQUEST, e.getMessage());
        }catch (Exception e){
            logger.error(e.getMessage());
            return ResponseBuilder.getFailResponse(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @Override
    public Response getAll(Pageable pageable, boolean isExport, String search, String status) {
        List<Ingredients> ingredientsList = ingredientsRepository.findAllByIsActiveTrue();
        return ResponseBuilder.getSuccessResponse(HttpStatus.OK,utilityService.getDtoList(ingredientsList,IngredientsDto.class),ingredientsList.size(),"Ingredients retrieved");
    }
}
