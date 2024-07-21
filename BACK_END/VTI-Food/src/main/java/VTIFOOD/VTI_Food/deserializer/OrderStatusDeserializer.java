package VTIFOOD.VTI_Food.deserializer;

import VTIFOOD.VTI_Food.model.Order;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;

public class OrderStatusDeserializer extends JsonDeserializer {
    @Override
    public Order.OrderStatus deserialize(JsonParser p, DeserializationContext ctxt)
            throws IOException, JsonProcessingException {
        String value = p.getText();
        return Order.OrderStatus.fromValue(value);
    }
}
