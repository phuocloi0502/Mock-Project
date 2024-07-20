package VTIFOOD.VTI_Food.service.entityservice;

import VTIFOOD.VTI_Food.DTO.OrderDetailDto;

import java.util.List;

public interface OrderDetailService {
    List<OrderDetailDto> getOrderDetailsByOrderId(Long orderId);
}
