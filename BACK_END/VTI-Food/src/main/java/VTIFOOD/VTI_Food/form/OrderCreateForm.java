package VTIFOOD.VTI_Food.form;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Getter
@Setter
public class OrderCreateForm extends BaseForm{

    private Long userId;

    @NotNull
    @PastOrPresent
    @CreationTimestamp
    @JsonIgnore
    private LocalDateTime deliveryDate;

    private String deliveryAddress;
    private String note;
    private Boolean paymentStatus;

    @NotNull
    @PastOrPresent
    @CreationTimestamp
    @JsonIgnore
    private LocalDateTime paymentDate;
    private Long paymentMethodId;
}
