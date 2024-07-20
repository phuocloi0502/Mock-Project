package VTIFOOD.VTI_Food.service.entityservice;

import VTIFOOD.VTI_Food.DTO.ProductDTO;
import VTIFOOD.VTI_Food.DTO.ProductImageDTO;
import VTIFOOD.VTI_Food.exception.DataNotFoundException;
import VTIFOOD.VTI_Food.form.ProductFilterForm;
import VTIFOOD.VTI_Food.model.Product;
import VTIFOOD.VTI_Food.model.ProductImage;
import VTIFOOD.VTI_Food.response.ProductResponse;
import lombok.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.PagedModel;

import java.util.List;


public interface ProductService {
    Product createProduct(ProductDTO productDTO) throws Exception;
    Product getProductById(long id) throws Exception;
    Page<Product> getAllProducts(Pageable pageable, ProductFilterForm form, String search);
    Product updateProduct(long id, ProductDTO productDTO) throws Exception;

    public Page<ProductDTO> getProductByCategoryId(long categoryId, Pageable pageable) throws DataNotFoundException;
    void deleteProduct(long id);
    boolean existsByName(String name);
    ProductImage createProductImage(
            Long productId,
            ProductImageDTO productImageDTO) throws Exception;
}
