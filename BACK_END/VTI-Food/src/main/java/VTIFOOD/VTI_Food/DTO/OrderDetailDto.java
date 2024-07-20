package VTIFOOD.VTI_Food.DTO;

import VTIFOOD.VTI_Food.model.Product;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class OrderDetailDto extends BaseDTO{
    private Long id;
    private Long orderId;
    private Integer quantity;
    private BigDecimal price;
    private Product product;
}
