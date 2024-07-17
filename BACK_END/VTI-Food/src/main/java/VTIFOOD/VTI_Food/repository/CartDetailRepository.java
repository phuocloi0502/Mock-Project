package VTIFOOD.VTI_Food.repository;
import VTIFOOD.VTI_Food.model.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartDetailRepository extends JpaRepository<CartDetail, Long> {
    CartDetail findByCartIdAndProductId(Long cartId, Long productId);

}
