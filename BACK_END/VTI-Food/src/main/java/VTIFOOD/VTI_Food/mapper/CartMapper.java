package VTIFOOD.VTI_Food.mapper;

import VTIFOOD.VTI_Food.DTO.CartDto;
import VTIFOOD.VTI_Food.form.CartForm;

public class CartMapper {
    public static CartDto map(CartForm form) {
        CartDto dto = new CartDto();
        dto.setUserId(form.getUserId());
        dto.setProductId(form.getProductId());
        dto.setQuantity(form.getQuantity());
        return dto;
    }
}
