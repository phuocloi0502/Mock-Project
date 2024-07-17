package VTIFOOD.VTI_Food.service.serviceImpl;

import VTIFOOD.VTI_Food.form.OrderCreateForm;
import VTIFOOD.VTI_Food.service.entityservice.OrderService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.StoredProcedureQuery;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

import static java.time.LocalDate.now;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {

    @PersistenceContext
    private EntityManager entityManager;

    public void createOrderFromCart(OrderCreateForm form) {
        try {

            String orderStatus = form.getOrderStatus().getValue();
            Boolean paymentStatus = form.getPaymentStatus();

            StoredProcedureQuery query = entityManager.createStoredProcedureQuery("CreateOrder");
            query.registerStoredProcedureParameter(1, Long.class, ParameterMode.IN);
            query.setParameter(1, form.getUserId());

            Timestamp deliveryDate = ConvertLocalDateToTimestamp(now().plusDays((long) 0.5).toString());
            if (form.getDeliveryDate() != null) {
                deliveryDate = ConvertLocalDateToTimestamp(form.getDeliveryDate().toString());
            }
            query.registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN);
            query.setParameter(2, deliveryDate);

            query.registerStoredProcedureParameter(3, String.class, ParameterMode.IN);
            query.setParameter(3, form.getDeliveryAddress());

            query.registerStoredProcedureParameter(4, String.class, ParameterMode.IN);
            query.setParameter(4, orderStatus);

            query.registerStoredProcedureParameter(5, String.class, ParameterMode.IN);
            query.setParameter(5, form.getNote());

            query.registerStoredProcedureParameter(6, Long.class, ParameterMode.IN);
            query.setParameter(6, form.getPaymentMethodId());

            query.registerStoredProcedureParameter(7, Boolean.class, ParameterMode.IN);
            query.setParameter(7, form.getPaymentStatus());

            Timestamp paymentDate = null;
            if (paymentStatus) {
                paymentDate = ConvertLocalDateToTimestamp(now().toString());
            }
            query.registerStoredProcedureParameter(8, Timestamp.class, ParameterMode.IN);
            query.setParameter(8, paymentDate);

            query.execute();
        } catch (Exception e) {
            throw new RuntimeException("Đặt hàng thất bại " + e.getMessage());
        }
    }

    private Timestamp ConvertLocalDateToTimestamp(String stringLocalDate) {
        // Parse the input string to LocalDate
        LocalDate date = LocalDate.parse(stringLocalDate);

        // Convert LocalDate to LocalDateTime
        LocalDateTime localDateTime = date.atStartOfDay();

        // Convert LocalDateTime to Timestamp
        Timestamp timestamp = Timestamp.valueOf(localDateTime);

        return timestamp;
    }
}
