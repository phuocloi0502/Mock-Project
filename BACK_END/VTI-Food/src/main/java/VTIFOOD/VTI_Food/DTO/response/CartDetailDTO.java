package VTIFOOD.VTI_Food.DTO.response;

import VTIFOOD.VTI_Food.model.CartDetail;
import lombok.*;
import java.io.Serializable;
import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class CartDetailDTO {

    private Long cartId;
    private Long cartDetailId;
    private Long productId;
    private String productName;
    private Float price;
    private Integer quantity;
    private Long userId;
    private String username;
    private String email;
    private List<String> images;

    // LOI
}
