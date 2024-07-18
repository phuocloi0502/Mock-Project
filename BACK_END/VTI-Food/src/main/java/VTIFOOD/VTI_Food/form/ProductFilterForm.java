package VTIFOOD.VTI_Food.form;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductFilterForm {
    private String name;
    private Float price;
    private Float minPrice;
    private Float maxPrice;
}
