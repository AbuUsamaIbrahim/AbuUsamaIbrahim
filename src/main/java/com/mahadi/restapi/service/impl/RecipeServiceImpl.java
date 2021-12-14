package com.mahadi.restapi.service.impl;

import com.mahadi.restapi.dto.RecipeDto;
import com.mahadi.restapi.dto.Response;
import com.mahadi.restapi.model.Recipe;
import com.mahadi.restapi.repository.MenuRepository;
import com.mahadi.restapi.repository.RecipeRepository;
import com.mahadi.restapi.service.RecipeService;
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

@Service("recipeService")
public class RecipeServiceImpl implements RecipeService {
    private static final Logger logger = LogManager.getLogger(MenuServiceImpl.class.getName());
    private final MenuRepository menuRepository;
    private final RecipeRepository recipeRepository;
    private final String root = "Recipe";
    private final UtilityService utilityService;
    private final ModelMapper modelMapper;

    @PersistenceContext
    private EntityManager entityManager;

    public RecipeServiceImpl(MenuRepository menuRepository, RecipeRepository recipeRepository, UtilityService utilityService, ModelMapper modelMapper, EntityManager entityManager) {
        this.menuRepository = menuRepository;
        this.recipeRepository = recipeRepository;
        this.utilityService = utilityService;
        this.modelMapper = modelMapper;
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public Response create(RecipeDto recipeDto) {
        Recipe recipe = modelMapper.map(recipeDto,Recipe.class);
        return utilityService.getCreateResponse(recipe,recipeRepository);
    }

    @Override
    @Transactional
    public Response update(Long id, RecipeDto recipeDto) {
        Response notFoundFailureResponse = utilityService.getNullResponse(recipeRepository,id);
        if(notFoundFailureResponse != null){
            return notFoundFailureResponse;
        }
        try {
            Recipe recipe = utilityService.getById(recipeRepository,id);
            return utilityService.getUpdateResponse(recipe,recipeDto,recipeRepository);
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
        Response notFoundFailureResponse = utilityService.getNullResponse(recipeRepository,id);
        if(notFoundFailureResponse != null){
            return notFoundFailureResponse;
        }
        try {
            Recipe recipe = utilityService.getById(recipeRepository,id);
            return utilityService.deleteEntityResponse(recipe,recipeRepository);
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
    public Response get(Long id) {
        Response notFoundFailureResponse = utilityService.getNullResponse(recipeRepository,id);
        if(notFoundFailureResponse != null){
            return notFoundFailureResponse;
        }
        try {
            Recipe recipe = utilityService.getById(recipeRepository,id);
            RecipeDto recipeDto = modelMapper.map(recipe,RecipeDto.class);
            return utilityService.getGetResponse(recipeDto,root);
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
        List<Recipe>recipeList = recipeRepository.findAllByIsActiveTrue();
        return ResponseBuilder.getSuccessResponse(HttpStatus.OK,utilityService.getDtoList(recipeList,RecipeDto.class),recipeList.size(),"Recipe retrived");
    }
}
