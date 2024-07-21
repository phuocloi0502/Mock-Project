package VTIFOOD.VTI_Food.form;

import VTIFOOD.VTI_Food.deserializer.OrderStatusDeserializer;
import VTIFOOD.VTI_Food.model.Order;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class OrderUpdateForm extends BaseForm{
    private LocalDateTime deliveryDate;
    private String deliveryAddress;
    @JsonDeserialize(using = OrderStatusDeserializer.class)
    private Order.OrderStatus orderStatus;
    private String note;
    private Boolean paymentStatus;
    private LocalDateTime paymentDate;
    private Long paymentMethodId;
}
