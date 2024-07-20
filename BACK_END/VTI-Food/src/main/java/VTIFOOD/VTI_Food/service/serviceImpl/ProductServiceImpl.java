package VTIFOOD.VTI_Food.service.serviceImpl;

import VTIFOOD.VTI_Food.DTO.ProductDTO;
import VTIFOOD.VTI_Food.DTO.ProductImageDTO;
import VTIFOOD.VTI_Food.exception.DataNotFoundException;
import VTIFOOD.VTI_Food.form.ProductFilterForm;
import VTIFOOD.VTI_Food.model.Category;
import VTIFOOD.VTI_Food.model.Product;
import VTIFOOD.VTI_Food.model.ProductImage;
import VTIFOOD.VTI_Food.repository.CategoryRepository;
import VTIFOOD.VTI_Food.repository.ProductImageRepository;
import VTIFOOD.VTI_Food.repository.ProductRepository;
import VTIFOOD.VTI_Food.service.entityservice.ProductService;
import VTIFOOD.VTI_Food.specification.ProductSpecification;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.modelmapper.PropertyMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.InvalidParameterException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductImageRepository productImageRepository;


    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Product createProduct(ProductDTO productDTO) throws Exception {
        Category findCategory = categoryRepository.findById(productDTO.getCategoryId()).orElseThrow(
                () -> new DataNotFoundException("Cannot find category with id: " + productDTO.getCategoryId())
        );
        Product newProduct = Product.builder()
                .name(productDTO.getName())
                .abstractProduct(productDTO.getAbstractProduct())
                .show(productDTO.isShow())
                .price(productDTO.getPrice())
                .category(findCategory)
                .description(productDTO.getDescription())
                .quantity(productDTO.getQuantity())
                .status(Product.ProductStatus.valueOf(productDTO.getStatus()))
                .build();
        return productRepository.save(newProduct);
    }

    @Override
    public Product getProductById(long id) throws Exception {
        return productRepository.findById(id).orElseThrow(
                () -> new DataNotFoundException("Cannot find product with id: " + id)
        );
    }

    @Override
    public Page<Product> getAllProducts(Pageable pageable, ProductFilterForm form, String search) {
        Specification<Product> name = ProductSpecification.buildWhere(search, form);
        return productRepository.findAll(name, pageable);

    }


    @Override
    @Transactional
    public Product updateProduct(long id, ProductDTO productDTO) throws Exception {
        if (productDTO.getName() == null || productDTO.getName().isEmpty()) {
            throw new InvalidParameterException("Product name must not be null or empty");
        }

        Product existProduct = productRepository.findById(id).orElseThrow(
                () -> new DataNotFoundException("Cannot find product with id: " + id)
        );


        Category findCategory = categoryRepository.findById(productDTO.getCategoryId()).orElseThrow(
                () -> new DataNotFoundException("Cannot find  category with id: " + productDTO.getCategoryId())
        );

        updateProductFromDTO(existProduct, productDTO, findCategory);
        existProduct.setUpdatedAt(LocalDateTime.now());

        return productRepository.save(existProduct);


    }

    private void updateProductFromDTO(Product product, ProductDTO productDTO, Category category) {
        product.setName(productDTO.getName());
        product.setPrice(productDTO.getPrice());
        product.setAbstractProduct(productDTO.getAbstractProduct());
        product.setQuantity(productDTO.getQuantity());
        product.setDescription(productDTO.getDescription());
        try {
            Product.ProductStatus productStatus = Product.ProductStatus.valueOf(productDTO.getStatus().toUpperCase());
            product.setStatus(productStatus);
        } catch (IllegalArgumentException e) {
            throw new InvalidParameterException("Invalid status value: " + productDTO.getStatus());
        }
        product.setShow(productDTO.isShow());
        product.setCategory(category);
    }

    @Override
    public Page<ProductDTO> getProductByCategoryId(long categoryId, Pageable pageable) throws DataNotFoundException {
        Category existCategory = categoryRepository.findById(categoryId).orElseThrow(
                () -> new DataNotFoundException("Cannot find category with id: " + categoryId)
        );
        Page<Product> products = productRepository.findByCategoryId(categoryId, pageable);
        List<ProductDTO> productDTOS = products.getContent().stream().map(
                product -> {
                    ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
                    productDTO.setCategoryId(categoryId);
                    productDTO.setCategoryName(existCategory.getName());
                    productDTO.setName(product.getName());
                    return productDTO;
                }
        ).collect(Collectors.toList());

        return new PageImpl<>(productDTOS, pageable, products.getTotalElements());
    }


    @Override
    public void deleteProduct(long id) {
        productRepository.deleteById(id);
    }

    @Override
    public boolean existsByName(String name) {
        return false;
    }

    @Override
    public ProductImage createProductImage(Long productId, ProductImageDTO productImageDTO) throws Exception {
        return null;
    }
}
