package VTIFOOD.VTI_Food.DTO;

import VTIFOOD.VTI_Food.model.Order;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter

@AllArgsConstructor
@RequiredArgsConstructor
public class OrderDto extends BaseDTO{
    private Long id;

    @JsonFormat(pattern = "yyyy-MM-dd hh:mma")
    private LocalDateTime deliveryDate;

    private String deliveryAddress;
    private Order.OrderStatus orderStatus;
    private String note;
    private boolean paymentStatus;

    @JsonFormat(pattern = "yyyy-MM-dd hh:mma")
    private LocalDateTime paymentDate;

    private BigDecimal totalAmount;

    private PaymentMethodDto paymentMethod;

    private OrderUserDto user;

    private List<OrderDetailDto> orderDetails;
}
