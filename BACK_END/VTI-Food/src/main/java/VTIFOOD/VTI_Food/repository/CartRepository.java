package VTIFOOD.VTI_Food.repository;

import VTIFOOD.VTI_Food.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findByUserId(Long userId);
}
