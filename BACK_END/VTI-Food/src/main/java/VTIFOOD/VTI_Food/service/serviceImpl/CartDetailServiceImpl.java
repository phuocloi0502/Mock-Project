package VTIFOOD.VTI_Food.service.serviceImpl;

import VTIFOOD.VTI_Food.DTO.response.CartDetailDTO;
import VTIFOOD.VTI_Food.DTO.response.CartDetailsResponseDTO;
import VTIFOOD.VTI_Food.DTO.response.CartResponse;
import VTIFOOD.VTI_Food.exception.DataNotFoundException;
import VTIFOOD.VTI_Food.exception.ResourceNotFoundException;
import VTIFOOD.VTI_Food.model.CartDetail;
import VTIFOOD.VTI_Food.model.Product;
import VTIFOOD.VTI_Food.repository.CartDetailRepository;
import VTIFOOD.VTI_Food.repository.ProductRepository;
import VTIFOOD.VTI_Food.service.entityservice.CartDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CartDetailServiceImpl implements CartDetailService {

    private final CartDetailRepository cartDetailRepository;
    private final ProductRepository productRepository;

    @Override
    public CartDetail findByCartDetailById(Long id) throws ResourceNotFoundException, DataNotFoundException {
        return cartDetailRepository.findById(id).orElseThrow(
                () -> new DataNotFoundException("Cannot find cartDetail with id: " + id));
    }

    @Override
    public Optional<CartDetail> findCartDetailById(Long id) {
        return cartDetailRepository.findById(id);
    }

    @Override
    public List<CartDetailsResponseDTO> getAllCartDetails() throws DataNotFoundException {
        List<CartDetail> cartDetails = cartDetailRepository.findAll();
        List<CartDetailsResponseDTO> cartDetailsResponseDTOS = new ArrayList<>();
        for (CartDetail cartDetail : cartDetails) {
            Product product = productRepository.findById(cartDetail.getProduct().getId()).orElseThrow(
                    () -> new DataNotFoundException("Cannot find product with id: " + cartDetail.getProduct().getId()));
            CartDetailsResponseDTO dto = new CartDetailsResponseDTO(
                    cartDetail.getId(),
                    cartDetail.getCart().getId(),
                    cartDetail.getProduct().getId(),
                    cartDetail.getQuantity(),
                    product != null ? product.getName() : null,
                    cartDetail.getCreatedAt(),
                    cartDetail.getUpdatedAt()

            );
            cartDetailsResponseDTOS.add(dto);

        }
        return cartDetailsResponseDTOS;
    }
}
