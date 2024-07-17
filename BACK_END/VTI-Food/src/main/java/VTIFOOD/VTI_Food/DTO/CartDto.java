package VTIFOOD.VTI_Food.DTO;

import jakarta.persistence.Column;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartDto {

    private Long userId;
    private Long productId;
    private int quantity;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt; // add this field

    private LocalDateTime updatedAt;

}
