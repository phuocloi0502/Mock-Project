package VTIFOOD.VTI_Food.response;

import VTIFOOD.VTI_Food.model.Product;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductResponse extends BaseResponse {

    private long id;
    private String name;
    private Float price;
    private String abstractProduct;
    private String description;
    private Integer quantity;
    private boolean show;
    private  String status;

    @JsonProperty("category_id")
    private Long categoryId;

    @JsonProperty("category_name")
    private String categoryName;
    public static ProductResponse fromProduct(Product product) {
        ProductResponse productResponse = ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .abstractProduct(product.getAbstractProduct())
                .quantity(product.getQuantity())
                .show(product.isShow())
                .status(product.getStatus().getValue())
                .description(product.getDescription())
                .categoryId(product.getCategory().getId())
                .categoryName(product.getCategory().getName())
                .build();
        productResponse.setCreatedAt(product.getCreatedAt());
        productResponse.setUpdatedAt(product.getUpdatedAt());
        return productResponse;
    }
}
