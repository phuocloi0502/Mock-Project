package VTIFOOD.VTI_Food.DTO;

import VTIFOOD.VTI_Food.model.Product;
import VTIFOOD.VTI_Food.model.ProductImage;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.hateoas.RepresentationModel;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductDTO extends RepresentationModel<ProductDTO> {
    private Long id; // mỗi card product phải có Id
    @NotEmpty(message = "Must not be empty")
    @Size(min = 3, message = "Product name must at least 3 characters long")
    private String name;

    @Min(value = 0, message = "Price must be greater than or equal 0")
    @Max(value = 10000000, message = "Price must be less than or equal 10000000")
    private Float price;

    @JsonProperty("abstract")
    private String abstractProduct;

    private Integer quantity;

    private String description;

    @NotNull(message = "Status must not be null")
    private String status; // default value is 1

    private boolean show;

    @JsonProperty("category_id")
    private Long categoryId;

    private String categoryName;

    private List<ProductImage> productImages;

    private LocalDateTime createdAt; // add this field

    private LocalDateTime updatedAt;
}
