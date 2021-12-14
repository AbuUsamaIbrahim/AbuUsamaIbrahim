package com.mahadi.restapi.repository;

import com.mahadi.restapi.enums.RoleName;
import com.mahadi.restapi.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, /*BigInteger*/ Long> {
    Role findByNameAndIsActiveTrue(RoleName roleName);

    Role findByIdAndIsActiveTrue(Long id);
}
