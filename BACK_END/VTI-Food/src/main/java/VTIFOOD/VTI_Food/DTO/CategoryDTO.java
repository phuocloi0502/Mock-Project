package VTIFOOD.VTI_Food.DTO;

import VTIFOOD.VTI_Food.model.Product;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.springframework.hateoas.RepresentationModel;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryDTO extends RepresentationModel<CategoryDTO> {

    private int id;
    @NotEmpty(message = "Category must not be empty")
    private String name;

    private List<ProductDTO> products;
    @EqualsAndHashCode(callSuper = true)
    @Data
    @NoArgsConstructor
    public static class ProductDTO extends RepresentationModel<ProductDTO>{
        @JsonProperty("product_id")
        private int id;

        @JsonProperty("product_name")
        private String name;
    }
}
