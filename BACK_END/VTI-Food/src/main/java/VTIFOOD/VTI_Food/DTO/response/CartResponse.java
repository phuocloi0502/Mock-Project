package VTIFOOD.VTI_Food.DTO.response;


import VTIFOOD.VTI_Food.model.Cart;
import VTIFOOD.VTI_Food.model.CartDetail;
import VTIFOOD.VTI_Food.model.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class CartResponse {

    private Long id;

    private UserInfo user;

    private List<CartDetail> cartDetails;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @JsonIgnore
    private LocalDateTime createdAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @JsonIgnore
    private LocalDateTime updatedAt;

    public static CartResponse convertToResponseDTO(Cart cart){
        CartResponse cartResponse = new CartResponse();
        cartResponse.setId(cart.getId());
        cartResponse.setCartDetails(cart.getCartDetails());
        cartResponse.setUser(new UserInfo(cart.getUser()));
        cartResponse.setUpdatedAt(cart.getUpdatedAt());
        cartResponse.setCreatedAt(cart.getCreatedAt());
        cartResponse.setCartDetails(cart.getCartDetails());
        return cartResponse;
    }
}
