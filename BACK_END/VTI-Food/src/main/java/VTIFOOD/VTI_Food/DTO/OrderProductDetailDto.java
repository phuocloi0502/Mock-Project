package VTIFOOD.VTI_Food.DTO;

import VTIFOOD.VTI_Food.model.Category;
import VTIFOOD.VTI_Food.model.ProductImage;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderProductDetailDto {
    private Long id;
    private String name;
    private Integer quantity;
    private Float price;
    private String abstractProduct;
    private String description;
    private List<ProductImage> productImages;
    private Category category;
}
