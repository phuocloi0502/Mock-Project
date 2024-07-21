package VTIFOOD.VTI_Food.service.entityservice;

import VTIFOOD.VTI_Food.DTO.OrderDto;
import VTIFOOD.VTI_Food.form.OrderCreateForm;
import VTIFOOD.VTI_Food.form.OrderUpdateForm;
import VTIFOOD.VTI_Food.model.Order;

import java.util.List;

public interface OrderService {
    void createOrderFromCart(OrderCreateForm form);
    List<OrderDto> getAllOrders();
    List<OrderDto> getOrdersByUserId(Long userId);
    Order updateOrder(Long id, OrderUpdateForm form);
}
