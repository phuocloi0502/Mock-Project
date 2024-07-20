package VTIFOOD.VTI_Food.controller;

import VTIFOOD.VTI_Food.form.OrderCreateForm;
import VTIFOOD.VTI_Food.service.entityservice.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("${api.prefix}/orders")
public class OrderContronller {
    @Autowired
    private OrderService orderService;

    @PostMapping("/create")
    public ResponseEntity<?> createOrderFromCart(@RequestBody OrderCreateForm form) {
        orderService.createOrderFromCart(form);
        return ResponseEntity.ok("Đã đặt hàng thành công");
    }
}
