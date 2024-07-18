package VTIFOOD.VTI_Food.service.serviceImpl;

import VTIFOOD.VTI_Food.DTO.CartDto;
import VTIFOOD.VTI_Food.exception.ResourceNotFoundException;
import VTIFOOD.VTI_Food.model.Cart;
import VTIFOOD.VTI_Food.model.CartDetail;
import VTIFOOD.VTI_Food.model.Product;
import VTIFOOD.VTI_Food.model.User;
import VTIFOOD.VTI_Food.repository.CartDetailRepository;
import VTIFOOD.VTI_Food.repository.CartRepository;
import VTIFOOD.VTI_Food.repository.ProductRepository;
import VTIFOOD.VTI_Food.repository.UserRepository;
import VTIFOOD.VTI_Food.service.entityservice.CartService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class CartServiceImpl implements CartService {

    private final UserRepository userRepository;

    private final CartRepository cartRepository;

    private final CartDetailRepository cartDetailRepository;

    private final ProductRepository productRepository;

    @Override
    public Cart addProductToCart(CartDto cartDto) {
        Cart cart = cartRepository.findByUserId(cartDto.getUserId());
        if (cart == null) {
            cart = new Cart();
            cart.setUser(userRepository.findById(cartDto.getUserId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy User")));
            cart = cartRepository.save(cart);
        }

        CartDetail cartDetail = cartDetailRepository.findByCartIdAndProductId(cart.getId(), cartDto.getProductId());
        if (cartDetail != null) {
            cartDetail.setQuantity(cartDetail.getQuantity() + cartDto.getQuantity());
        } else {
            cartDetail = new CartDetail();
            cartDetail.setCart(cart);
            cartDetail.setProduct(productRepository.findById(cartDto.getProductId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm")));
            cartDetail.setQuantity(cartDto.getQuantity());
        }
        cartDetailRepository.save(cartDetail);
        return cart;
    }

    @Override
    @Transactional
    public void updateProductInCart(Long userId, Long productId, int quantity) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy User"));

        Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) {
            throw new RuntimeException("Không tìm thấy giỏ hàng");
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));

        CartDetail cartDetail = cartDetailRepository.findByCartIdAndProductId(cart.getId(), productId);
        if (cartDetail == null) {
            throw new RuntimeException("Không tìm thấy sản phẩm trong giỏ hàng");
        }
        cartDetail.setUpdatedAt(LocalDateTime.now());

        if (quantity > 0) {
            cartDetail.setQuantity(quantity);
            cartDetailRepository.save(cartDetail);

        } else {
            cartDetailRepository.delete(cartDetail);
        }
    }

    @Override
    @Transactional
    public void removeProductFromCart(Long userId, Long productId) throws ResourceNotFoundException {
        CartDetail cartDetail = cartDetailRepository.findByCartIdAndProductId(userId, productId);
        if (cartDetail == null) {
            throw new ResourceNotFoundException("Product not found in cart");

        }
        cartDetailRepository.delete(cartDetail);
    }
}
