package VTIFOOD.VTI_Food.DTO.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class CartDetailsResponseDTO {
    private Long id;
    private Long cartId;
    private Long productId;
    private Integer quantity;
    private String productName;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @JsonIgnore
    private LocalDateTime createdAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @JsonIgnore
    private LocalDateTime updatedAt;
}
