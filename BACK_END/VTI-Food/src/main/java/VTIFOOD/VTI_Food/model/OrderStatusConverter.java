package VTIFOOD.VTI_Food.model;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class OrderStatusConverter implements AttributeConverter<Order.OrderStatus, String> {

    @Override
    public String convertToDatabaseColumn(Order.OrderStatus status) {
        if (status == null) {
            return null;
        }
        return status.getValue();
    }

    @Override
    public Order.OrderStatus convertToEntityAttribute(String dbData) {
        if (dbData == null) {
            return null;
        }
        return Order.OrderStatus.fromValue(dbData);
    }
}
