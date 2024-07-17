package VTIFOOD.VTI_Food.controller;

import VTIFOOD.VTI_Food.DTO.ProductDTO;
import VTIFOOD.VTI_Food.exception.DataNotFoundException;
import VTIFOOD.VTI_Food.form.ProductFilterForm;
import VTIFOOD.VTI_Food.model.Product;
import VTIFOOD.VTI_Food.service.entityservice.ProductService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.InvalidParameterException;
import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@CrossOrigin("*")
@RestController
@RequestMapping("${api.prefix}/products")
public class ProductController {

    @Autowired
    private ModelMapper modelMapper;
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping()
    public ResponseEntity<?> createProduct(@Valid @RequestBody ProductDTO productDTO) throws Exception {
        try {
            Product newProduct = productService.createProduct(productDTO);
            return ResponseEntity.ok(newProduct);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable(value = "id") long id) throws Exception {
        Product findProduct = productService.getProductById(id);
        ProductDTO productDTO = modelMapper.map(findProduct, ProductDTO.class);
        productDTO.add(linkTo(methodOn(ProductController.class).getProductById(id)).withSelfRel());
        return ResponseEntity.ok(productDTO);
        // return ResponseEntity.ok(findProduct);
    }

    @GetMapping()
    public ResponseEntity<?> getAllProducts(Pageable pageable,
            @RequestParam(value = "search", required = false) String search,
            ProductFilterForm form) {
        try {
            Page<Product> products = productService.getAllProducts(pageable, form, search);
            List<ProductDTO> productDTOS = modelMapper.map(
                    products.getContent(), new TypeToken<List<ProductDTO>>() {
                    }.getType());

            PageImpl<ProductDTO> proPage = new PageImpl<>(productDTOS, pageable, products.getTotalElements());
            return ResponseEntity.ok(proPage);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }

    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<?> getProductByCategoryId(@PathVariable(value = "categoryId") long categoryId,
            Pageable pageable) {
        try {
            Page<ProductDTO> productDTOS = productService.getProductByCategoryId(categoryId, pageable);
            PagedModel.PageMetadata pageMetadata = new PagedModel.PageMetadata(
                    pageable.getPageSize(), productDTOS.getNumber(), productDTOS.getTotalElements(),
                    productDTOS.getTotalPages());
            PagedModel<ProductDTO> pagedModel = PagedModel.of(productDTOS.getContent(), pageMetadata);
            pagedModel.add(linkTo(methodOn(ProductController.class).getProductByCategoryId(categoryId, pageable))
                    .withSelfRel());
            return ResponseEntity.ok(pagedModel);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatedProduct(@PathVariable(value = "id") long id, @RequestBody ProductDTO productDTO) {
        try {
            productDTO.setUpdatedAt(null);
            Product updateProduct = productService.updateProduct(id, productDTO);
            return ResponseEntity.ok(updateProduct);
        } catch (DataNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (InvalidParameterException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProductById(@PathVariable(value = "id") long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok("Delete success product with id: " + id);
    }

}
