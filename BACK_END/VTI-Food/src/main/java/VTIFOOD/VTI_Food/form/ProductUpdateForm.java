package VTIFOOD.VTI_Food.form;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProductUpdateForm extends BaseForm {

//    private long id;

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
    private int status = 1; //default value is 1

    private boolean show;

    @JsonProperty("category_id")
    private Long categoryId;
}
