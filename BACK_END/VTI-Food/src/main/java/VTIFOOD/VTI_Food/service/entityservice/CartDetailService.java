package VTIFOOD.VTI_Food.service.entityservice;

import VTIFOOD.VTI_Food.DTO.response.CartDetailDTO;
import VTIFOOD.VTI_Food.DTO.response.CartDetailsResponseDTO;
import VTIFOOD.VTI_Food.exception.DataNotFoundException;
import VTIFOOD.VTI_Food.exception.ResourceNotFoundException;
import VTIFOOD.VTI_Food.model.CartDetail;
import lombok.Setter;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.List;

public interface CartDetailService {
    CartDetail findByCartDetailById(Long id) throws ResourceNotFoundException, DataNotFoundException;

    Optional<CartDetail> findCartDetailById(Long id);

    // LOI
    List<CartDetailDTO> getCartDetailsByUserId(Long userId);

}
