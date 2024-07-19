package VTIFOOD.VTI_Food.DTO.response;

import VTIFOOD.VTI_Food.model.CartDetail;
import lombok.*;
import java.io.Serializable;

@Data
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class CartDetailDTO {

    private Long cartId;
    private Long cartDetailId;
    private Long productId;
    private String productName; // Tên sản phẩm
    private Integer quantity;
    private Long userId; // Thông tin người dùng
    private String username; // Tên người dùng
    private String email; // Email người dùng

    // LOI
}
// public class CartDetailDTO {
// private Long id;
// private Long productId;
// private Long cartId;
// private int quantity;

// public static CartDetailDTO fromEntity(CartDetail cartDetail) {
// CartDetailDTO dto = new CartDetailDTO();
// dto.setId(cartDetail.getId());
// dto.setProductId(cartDetail.getProduct().getId());
// dto.setCartId(cartDetail.getCart().getId());
// dto.setQuantity(cartDetail.getQuantity());
// return dto;
// }
// }
