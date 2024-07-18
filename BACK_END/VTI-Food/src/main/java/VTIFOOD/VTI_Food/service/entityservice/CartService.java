package VTIFOOD.VTI_Food.service.entityservice;

import VTIFOOD.VTI_Food.DTO.CartDto;
import VTIFOOD.VTI_Food.exception.ResourceNotFoundException;
import VTIFOOD.VTI_Food.model.Cart;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

public interface CartService {
   Cart addProductToCart(CartDto cartDto);

    void updateProductInCart(Long userId, Long productId, int quantity);

    void removeProductFromCart(Long userId, Long productId) throws ResourceNotFoundException;
}
