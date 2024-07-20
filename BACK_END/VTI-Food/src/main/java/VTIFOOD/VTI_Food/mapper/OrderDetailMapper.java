package VTIFOOD.VTI_Food.mapper;

import VTIFOOD.VTI_Food.DTO.OrderDetailDto;
import VTIFOOD.VTI_Food.model.OrderDetail;

public class OrderDetailMapper{
    public static OrderDetailDto map(OrderDetail orderDetail) {
        OrderDetailDto dto = new OrderDetailDto();
        dto.setId(orderDetail.getId());
        dto.setOrderId(orderDetail.getOrder().getId());
        dto.setPrice(orderDetail.getPrice());
        dto.setQuantity(orderDetail.getQuantity());
        dto.setProduct(orderDetail.getProduct());
        dto.setCreatedAt(orderDetail.getCreatedAt());
        dto.setUpdatedAt(orderDetail.getUpdatedAt());
        return dto;
    }
}
