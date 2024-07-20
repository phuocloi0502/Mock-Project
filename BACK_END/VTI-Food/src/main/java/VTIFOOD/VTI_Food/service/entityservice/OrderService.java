package VTIFOOD.VTI_Food.service.entityservice;

import VTIFOOD.VTI_Food.DTO.OrderDto;
import VTIFOOD.VTI_Food.form.OrderCreateForm;

import java.util.List;

public interface OrderService {
    void createOrderFromCart(OrderCreateForm form);
    List<OrderDto> getAllOrders();
}
