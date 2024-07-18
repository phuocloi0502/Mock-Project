package VTIFOOD.VTI_Food.form;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartForm extends BaseForm{
    private Long userId;
    private Long productId;
    private int quantity;
}
