package VTIFOOD.VTI_Food.DTO.response;

import VTIFOOD.VTI_Food.model.CartDetail;
import lombok.*;


@Data
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class CartDetailDTO {
    private Long id;
    private Long productId;
    private Long cartId;
    private int quantity;


    public static CartDetailDTO fromEntity(CartDetail cartDetail) {
        CartDetailDTO dto = new CartDetailDTO();
        dto.setId(cartDetail.getId());
        dto.setProductId(cartDetail.getProduct().getId());
        dto.setCartId(cartDetail.getCart().getId());
        dto.setQuantity(cartDetail.getQuantity());
        return dto;
    }
}
