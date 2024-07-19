package VTIFOOD.VTI_Food.service.serviceImpl;

import VTIFOOD.VTI_Food.DTO.response.CartDetailDTO;
import VTIFOOD.VTI_Food.DTO.response.CartResponse;
import VTIFOOD.VTI_Food.exception.DataNotFoundException;
import VTIFOOD.VTI_Food.exception.ResourceNotFoundException;
import VTIFOOD.VTI_Food.model.CartDetail;
import VTIFOOD.VTI_Food.repository.CartDetailRepository;
import VTIFOOD.VTI_Food.service.entityservice.CartDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CartDetailServiceImpl implements CartDetailService {

    private final CartDetailRepository cartDetailRepository;

    @Override
    public CartDetail findByCartDetailById(Long id) throws ResourceNotFoundException, DataNotFoundException {
        return cartDetailRepository.findById(id).orElseThrow(
                () -> new DataNotFoundException("Cannot find cartDetail with id: " + id));
    }

    @Override
    public Optional<CartDetail> findCartDetailById(Long id) {
        return cartDetailRepository.findById(id);
    }

    // LOI
    @Override
    public List<CartDetailDTO> getCartDetailsByUserId(Long userId) {
        return cartDetailRepository.findCartDetailsByUserId(userId);
    }
}
