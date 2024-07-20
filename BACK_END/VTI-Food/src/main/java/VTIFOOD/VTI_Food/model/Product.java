package VTIFOOD.VTI_Food.model;

import VTIFOOD.VTI_Food.response.BaseResponse;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "products")
public class Product extends BaseResponse implements Serializable  {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "quantity", nullable = false)
    private int quantity;

    @Column(name = "price")
    private Float price;

    @Column(name = "abstract", length = 300)
    private String abstractProduct;

    @Column(name = "description", length = 300)
    private String description;

    @Convert(converter = ProductConvertToClass.class)
    @Column(name =  "`status`", nullable = false)
    private ProductStatus status;

    @Column(name = "is_show", nullable = false)
    private boolean show;


    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<ProductImage> productImages;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonBackReference
    private Category category;

    public enum ProductStatus {
        ACTIVE("Active"),
        INACTIVE("Inactive"),
        OUT_OF_STOCK("Out of stock"),
        PENDING("Pending");

        private String value;

        private ProductStatus(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }

        public static ProductStatus toEnum(String value) {
            for (ProductStatus status : ProductStatus.values()) {
                if (status.value.equalsIgnoreCase(value)) {
                    return status;
                }
            }
            throw new IllegalArgumentException("Unknown status value: " + value);
        }
    }
}
