package VTIFOOD.VTI_Food.controller;

import VTIFOOD.VTI_Food.DTO.ProductDTO;
import VTIFOOD.VTI_Food.model.CartDetail;
import VTIFOOD.VTI_Food.model.Product;
import VTIFOOD.VTI_Food.service.entityservice.CartDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/cart_details")
public class CartDetailController {

    private final CartDetailService cartDetailService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getCartDetailById(@PathVariable(value = "id") long id) throws Exception {
        CartDetail cartDetail = cartDetailService.findByCartDetailById(id);
        return ResponseEntity.ok(cartDetail);

    }
    // @GetMapping("/{id}")
    // public ResponseEntity<?> getCartDetailByCartId(@PathVariable(value = "id")
    // long id) throws Exception {
    // CartDetail cartDetail = cartDetailService.findByCartDetailById(id);
    // return ResponseEntity.ok(cartDetail);

    // } // LOI
}
