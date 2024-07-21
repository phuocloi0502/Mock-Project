package VTIFOOD.VTI_Food.mapper;

import VTIFOOD.VTI_Food.DTO.RoleDto;
import VTIFOOD.VTI_Food.model.Role;

public class RoleMapper {
    public static RoleDto map(Role role) {
        RoleDto dto = new RoleDto();
        dto.setId(role.getId());
        dto.setName(role.getName());
        dto.setRole(role.getRole());
        return dto;
    }
}
