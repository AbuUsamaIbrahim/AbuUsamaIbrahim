package com.mahadi.restapi.service.impl;

import com.mahadi.restapi.dto.MenuDto;
import com.mahadi.restapi.dto.Response;
import com.mahadi.restapi.model.Menu;
import com.mahadi.restapi.repository.MenuRepository;
import com.mahadi.restapi.repository.RecipeRepository;
import com.mahadi.restapi.service.MenuService;
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
import java.util.ArrayList;
import java.util.List;

@Service("menuService")
public class MenuServiceImpl implements MenuService {
    private static final Logger logger = LogManager.getLogger(MenuServiceImpl.class.getName());
    private final MenuRepository menuRepository;
    private final RecipeRepository recipeRepository;
    private final String root = "Menu";
    private final UtilityService utilityService;
    private final ModelMapper modelMapper;

    @PersistenceContext
    private EntityManager entityManager;

    public MenuServiceImpl(MenuRepository menuRepository, RecipeRepository recipeRepository, UtilityService utilityService, ModelMapper modelMapper) {
        this.menuRepository = menuRepository;
        this.recipeRepository = recipeRepository;
        this.utilityService = utilityService;
        this.modelMapper = modelMapper;
    }

    @Override
    @Transactional
    public Response create(MenuDto menuDto) {
        Menu menu = modelMapper.map(menuDto, Menu.class);
        return utilityService.getCreateResponse(menu, menuRepository);
    }

    @Override
    @Transactional
    public Response update(Long id, MenuDto menuDto) {
        Response notFoundFailureResponse = utilityService.getNullResponse(menuRepository, id);
        if (notFoundFailureResponse != null) {
            return notFoundFailureResponse;
        }
        try {
            Menu menu = utilityService.getById(menuRepository, id);
            return utilityService.getUpdateResponse(menu, menuDto, menuRepository);
        } catch (NullPointerException e) {
            logger.error(e.getMessage());
            return ResponseBuilder.getFailResponse(HttpStatus.BAD_REQUEST, e.getMessage());
        }
        catch (Exception e){
            logger.error(e.getMessage());
            return ResponseBuilder.getFailResponse(HttpStatus.INTERNAL_SERVER_ERROR,e.getMessage());
        }
    }

    @Override
    @Transactional
    public Response delete(Long id) {
        Response notFoundFailureResponse = utilityService.getNullResponse(menuRepository, id);
        if (notFoundFailureResponse != null) {
            return notFoundFailureResponse;
        }
        try {
            Menu menu = utilityService.getById(menuRepository, id);
            return utilityService.deleteEntityResponse(menu, menuRepository);
        } catch (NullPointerException e) {
            logger.error(e.getMessage());
            return ResponseBuilder.getFailResponse(HttpStatus.BAD_REQUEST, e.getMessage());
        }
        catch (Exception e){
            logger.error(e.getMessage());
            return ResponseBuilder.getFailResponse(HttpStatus.INTERNAL_SERVER_ERROR,e.getMessage());
        }
    }

    @Override
    @Transactional
    public Response get(Long id) {
        Response notFoundFailureResponse = utilityService.getNullResponse(menuRepository, id);
        if (notFoundFailureResponse != null) {
            return notFoundFailureResponse;
        }
        try {
            Menu menu = utilityService.getById(menuRepository, id);
            MenuDto menuDto = modelMapper.map(menu,MenuDto.class);
            return utilityService.getGetResponse(menuDto, root);
        } catch (NullPointerException e) {
            logger.error(e.getMessage());
            return ResponseBuilder.getFailResponse(HttpStatus.BAD_REQUEST, e.getMessage());
        }
        catch (Exception e){
            logger.error(e.getMessage());
            return ResponseBuilder.getFailResponse(HttpStatus.INTERNAL_SERVER_ERROR,e.getMessage());
        }
    }

    @Override
    public Response getAll(Pageable pageable, boolean isExport, String search, String status) {
        List<Menu> menuList = menuRepository.findAllByIsActiveTrue();
        if(menuList == null){
            return ResponseBuilder.getFailResponse(HttpStatus.OK,"No Data Available");
        }
        return ResponseBuilder.getSuccessResponse(HttpStatus.OK, utilityService.getDtoList(menuList, MenuDto.class), menuList.size(), "Menu retrived");
    }

    @Override
    public Response getAllMenuRecipe() {
        return null;
    }
}
