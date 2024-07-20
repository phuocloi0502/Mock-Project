package VTIFOOD.VTI_Food.mapper;

import VTIFOOD.VTI_Food.DTO.OrderProductDto;
import VTIFOOD.VTI_Food.model.Product;

public class OrderProductMapper {
    public static OrderProductDto map(Product product) {
        OrderProductDto dto = new OrderProductDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setQuantity(product.getQuantity());
        dto.setPrice(product.getPrice());
        dto.setAbstractProduct(product.getAbstractProduct());
        dto.setDescription(product.getDescription());
        dto.setCategory(product.getCategory());
        return dto;
    }
}
