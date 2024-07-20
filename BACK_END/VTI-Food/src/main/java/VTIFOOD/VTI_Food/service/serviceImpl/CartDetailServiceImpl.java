package VTIFOOD.VTI_Food.service.serviceImpl;

import VTIFOOD.VTI_Food.DTO.response.CartDetailDTO;
import VTIFOOD.VTI_Food.DTO.response.CartDetailsResponseDTO;
import VTIFOOD.VTI_Food.DTO.response.CartResponse;
import VTIFOOD.VTI_Food.exception.DataNotFoundException;
import VTIFOOD.VTI_Food.exception.ResourceNotFoundException;
import VTIFOOD.VTI_Food.model.CartDetail;
import VTIFOOD.VTI_Food.model.Product;
import VTIFOOD.VTI_Food.model.ProductImage;
import VTIFOOD.VTI_Food.repository.CartDetailRepository;
import VTIFOOD.VTI_Food.repository.ProductRepository;
import VTIFOOD.VTI_Food.service.entityservice.CartDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
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
        // return cartDetailRepository.findCartDetailsByUserId(userId);
        List<CartDetail> cartDetails = cartDetailRepository.findCartDetailsByUserId(userId);

        return cartDetails.stream().map(cd -> {
            List<String> images = cd.getProduct().getProductImages().stream()
                    .map(ProductImage::getImageUrl)
                    .collect(Collectors.toList());
            return new CartDetailDTO(
                    cd.getCart().getId(),
                    cd.getId(),
                    cd.getProduct().getId(),
                    cd.getProduct().getName(),
                    cd.getProduct().getPrice(),
                    cd.getQuantity(),
                    cd.getCart().getUser().getId(),
                    cd.getCart().getUser().getUsername(),
                    cd.getCart().getUser().getEmail(),
                    images);
        }).collect(Collectors.toList());
    }

}
