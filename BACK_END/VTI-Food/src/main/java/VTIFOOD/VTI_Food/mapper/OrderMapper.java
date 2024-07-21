package VTIFOOD.VTI_Food.mapper;

import VTIFOOD.VTI_Food.DTO.OrderDto;
import VTIFOOD.VTI_Food.form.OrderUpdateForm;
import VTIFOOD.VTI_Food.model.Order;
import VTIFOOD.VTI_Food.model.PaymentMethod;

public class OrderMapper {
    public static OrderDto map(Order order) {
        OrderDto dto = new OrderDto();
        dto.setId(order.getId());
        dto.setDeliveryDate(order.getDeliveryDate());
        dto.setDeliveryAddress(order.getDeliveryAddress());
        dto.setOrderStatus(order.getOrderStatus().getValue());
        dto.setNote(order.getNote());
        dto.setPaymentStatus(order.getPaymentStatus());
        dto.setPaymentDate(order.getPaymentDate());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setPaymentMethod(PaymentMethodMapper.map(order.getPaymentMethod()));
        dto.setUser(UserMapper.map(order.getUser()));
        dto.setOrderDetails(order.getOrderDetails().stream().map(OrderDetailMapper::map).toList());
        dto.setCreatedAt(order.getCreatedAt());
        dto.setUpdatedAt(order.getUpdatedAt());
        return dto;
    }

    public static void map(OrderUpdateForm form, Order order, PaymentMethod paymentMethod) {
        order.setDeliveryDate(form.getDeliveryDate());
        order.setDeliveryAddress(form.getDeliveryAddress());
        order.setOrderStatus(Order.OrderStatus.fromValue(form.getOrderStatus().getValue()));
        order.setNote(form.getNote());
        order.setPaymentStatus(form.getPaymentStatus());
        order.setPaymentDate(form.getPaymentDate());
        order.setPaymentMethod(paymentMethod);
    }
}
