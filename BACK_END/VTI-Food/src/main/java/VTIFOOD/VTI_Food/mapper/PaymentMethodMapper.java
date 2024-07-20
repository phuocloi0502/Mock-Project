package VTIFOOD.VTI_Food.mapper;
import VTIFOOD.VTI_Food.DTO.PaymentMethodDto;
import VTIFOOD.VTI_Food.model.PaymentMethod;

public class PaymentMethodMapper {
    public static PaymentMethodDto map(PaymentMethod paymentMethod) {
        PaymentMethodDto dto = new PaymentMethodDto();
        dto.setId(paymentMethod.getId());
        dto.setName(paymentMethod.getName());
        return dto;
    }
}
