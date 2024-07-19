package VTIFOOD.VTI_Food.repository;

import VTIFOOD.VTI_Food.DTO.response.CartDetailDTO;
import VTIFOOD.VTI_Food.model.CartDetail;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

import java.util.List;

public interface CartDetailRepository extends JpaRepository<CartDetail, Long> {
    CartDetail findByCartIdAndProductId(Long cartId, Long productId);

    // LOI
    @Query("SELECT new VTIFOOD.VTI_Food.DTO.response.CartDetailDTO(c.id, cd.id, p.id, p.name, cd.quantity, u.id, u.username, u.email) "
            + "FROM CartDetail cd "
            + "JOIN cd.cart c "
            + "JOIN cd.product p "
            + "JOIN c.user u "
            + "WHERE u.id = :userId")
    List<CartDetailDTO> findCartDetailsByUserId(@Param("userId") Long userId);

}
