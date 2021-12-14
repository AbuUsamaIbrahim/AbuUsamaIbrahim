package com.mahadi.restapi.repository;

import com.mahadi.restapi.model.Menu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MenuRepository extends JpaRepository<Menu,Long> {
    Menu findByIdAndIsActiveTrue(Long id);

    List<Menu> findAllByIsActiveTrue();
}
