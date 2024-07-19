package VTIFOOD.VTI_Food.controller;

import VTIFOOD.VTI_Food.DTO.CartDto;
import VTIFOOD.VTI_Food.DTO.response.CartResponse;
import VTIFOOD.VTI_Food.form.CartForm;
import VTIFOOD.VTI_Food.mapper.CartMapper;
import VTIFOOD.VTI_Food.model.Cart;
import VTIFOOD.VTI_Food.model.Product;
import VTIFOOD.VTI_Food.model.User;
import VTIFOOD.VTI_Food.repository.ProductRepository;
import VTIFOOD.VTI_Food.service.entityservice.CartService;
import VTIFOOD.VTI_Food.service.entityservice.ProductService;
import VTIFOOD.VTI_Food.service.entityservice.UserService;
import jakarta.persistence.EntityNotFoundException;

import VTIFOOD.VTI_Food.repository.ProductRepository;
import VTIFOOD.VTI_Food.service.entityservice.CartService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("${api.prefix}/carts")
@CrossOrigin("*")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserService userService;

    @PostMapping("/add")

    public ResponseEntity<?> addProductToCart(@RequestBody CartDto cartDto) {
        Cart cart = cartService.addProductToCart(cartDto);
        CartResponse cartResponse = CartResponse.convertToResponseDTO(cart);
        return ResponseEntity.ok(cartResponse);
    }
    // public ResponseEntity<?> addProductToCart(@RequestBody CartForm form) {
    // CartDto dto = CartMapper.map(form);
    // cartService.addProductToCart(dto.getUserId(), dto.getProductId(),
    // dto.getQuantity());
    // return ResponseEntity.ok("Thêm sản phẩm vào giỏ hàng thành công");
    //
    // }

    @PutMapping("/update")
    public ResponseEntity<?> updateProductInCart(@RequestBody CartForm form) {
        CartDto dto = CartMapper.map(form);
        cartService.updateProductInCart(dto.getUserId(), dto.getProductId(), dto.getQuantity());

        return ResponseEntity.ok("Cập nhật giỏ hàng thành công");
    }

    @DeleteMapping("/{cardId}/product/{productId}")
    public ResponseEntity<?> removeProductFromCart(@PathVariable Long cardId, @PathVariable Long productId) {
        try {
            cartService.removeProductFromCart(cardId, productId);
            return ResponseEntity.ok().body("Product removed from cart successfully");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while removing product from cart");
        }
    }
}
