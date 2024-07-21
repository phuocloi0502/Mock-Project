package VTIFOOD.VTI_Food.controller;

import VTIFOOD.VTI_Food.DTO.OrderDetailDto;
import VTIFOOD.VTI_Food.DTO.OrderDto;
import VTIFOOD.VTI_Food.form.OrderCreateForm;
import VTIFOOD.VTI_Food.form.OrderUpdateForm;
import VTIFOOD.VTI_Food.mapper.OrderMapper;
import VTIFOOD.VTI_Food.model.Order;
import VTIFOOD.VTI_Food.service.entityservice.OrderDetailService;
import VTIFOOD.VTI_Food.service.entityservice.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("${api.prefix}/orders")
@CrossOrigin("*")
public class OrderContronller {
    @Autowired
    private OrderService orderService;
    @Autowired
    private OrderDetailService orderDetailService;

    @PostMapping("/create")
    public ResponseEntity<?> createOrderFromCart(@RequestBody OrderCreateForm form) {
        orderService.createOrderFromCart(form);
        return ResponseEntity.ok(orderService.getAllOrders());
//        return ResponseEntity.ok("Đã đặt hàng thành công");
    }

    @GetMapping
    public ResponseEntity<List<OrderDto>> getAllOrders() {
        List<OrderDto> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/user/{userId}")
    public List<OrderDto> getOrdersByUserId(@PathVariable Long userId) {
        return orderService.getOrdersByUserId(userId);
    }

    @GetMapping("/{orderId}")
    public List<OrderDetailDto> getOrderDetailsByOrderId(@PathVariable Long orderId) {
        return orderDetailService.getOrderDetailsByOrderId(orderId);
    }

    @PutMapping("/{id}")
    public OrderDto updateOrder(@PathVariable Long id, @RequestBody OrderUpdateForm form) {
        Order order = orderService.updateOrder(id, form);
        return OrderMapper.map(order);
    }
}
