package VTIFOOD.VTI_Food.mapper;

import VTIFOOD.VTI_Food.DTO.OrderProductDto;
import VTIFOOD.VTI_Food.model.Product;

public class ProductMapper {
    public static OrderProductDto map(Product product) {
        OrderProductDto dto = new OrderProductDto();
        return dto;
    }
}
