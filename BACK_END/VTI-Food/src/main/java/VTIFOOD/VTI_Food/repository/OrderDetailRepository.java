package VTIFOOD.VTI_Food.repository;

import VTIFOOD.VTI_Food.model.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
}
