package VTIFOOD.VTI_Food.repository;

import VTIFOOD.VTI_Food.model.PaymentMethod;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Long> {
}
