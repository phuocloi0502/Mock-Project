package VTIFOOD.VTI_Food.form;

import VTIFOOD.VTI_Food.model.Order;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class OrderCreateForm extends BaseForm{

    private Long userId;

    @NotNull
    @PastOrPresent
    private LocalDate deliveryDate;

    private String deliveryAddress;
    private Order.OrderStatus orderStatus;
    private String note;
    private Boolean paymentStatus;

    @NotNull
    @PastOrPresent
    private LocalDate paymentDate;
    private Long paymentMethodId;
}
