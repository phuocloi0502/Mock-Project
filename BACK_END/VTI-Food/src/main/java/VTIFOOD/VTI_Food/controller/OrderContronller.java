package VTIFOOD.VTI_Food.controller;

import VTIFOOD.VTI_Food.DTO.OrderDto;
import VTIFOOD.VTI_Food.form.OrderCreateForm;
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
}
