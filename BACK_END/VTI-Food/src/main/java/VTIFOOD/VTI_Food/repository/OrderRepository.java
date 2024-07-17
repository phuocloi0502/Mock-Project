package VTIFOOD.VTI_Food.repository;

import VTIFOOD.VTI_Food.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
