package VTIFOOD.VTI_Food.repository;

import VTIFOOD.VTI_Food.model.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
    List<ProductImage> findByProductId(Long productId);

    long countByProductId(Long productId);
}
