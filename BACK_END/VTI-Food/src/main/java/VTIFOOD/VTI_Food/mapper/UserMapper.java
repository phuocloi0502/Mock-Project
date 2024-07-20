package VTIFOOD.VTI_Food.mapper;

import VTIFOOD.VTI_Food.DTO.OrderUserDto;
import VTIFOOD.VTI_Food.model.User;

public class UserMapper {
    public static OrderUserDto map(User user) {
        OrderUserDto dto = new OrderUserDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setDob(user.getDob());
        dto.setEmail(user.getEmail());
        dto.setAddress(user.getAddress());
        dto.setPhoneNumber(user.getPhoneNumber());
        return dto;
    }
}
