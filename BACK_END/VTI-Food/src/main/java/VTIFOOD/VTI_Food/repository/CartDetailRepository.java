package VTIFOOD.VTI_Food.repository;
import VTIFOOD.VTI_Food.model.CartDetail;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartDetailRepository extends JpaRepository<CartDetail, Long> {
    CartDetail findByCartIdAndProductId(Long cartId, Long productId);

    @NonNull List<CartDetail> findAll();
}
