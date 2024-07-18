package VTIFOOD.VTI_Food.service;

import VTIFOOD.VTI_Food.exception.DataNotFoundException;
import VTIFOOD.VTI_Food.model.Product;
import VTIFOOD.VTI_Food.model.ProductImage;
import VTIFOOD.VTI_Food.repository.ProductImageRepository;
import VTIFOOD.VTI_Food.repository.ProductRepository;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class ProductImageService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductImageRepository productImageRepository;

    @Value("${product.image.upload.path}")
    private String uploadPath;

    public void uploadProductImage(Long productId, java.util.List<MultipartFile> file) throws Exception {
        Product product = productRepository.findById(productId).orElseThrow(
                () -> new DataNotFoundException("Cannot find product with id: " + productId));
        long imageCount = productImageRepository.countByProductId(productId);
        if (imageCount >= 5) {
            throw new Exception("A product can have a maximum of 5 images");
        }

        File uploadDir = new File(uploadPath);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }
        for (MultipartFile uploadedFile : file) {
            String filename = UUID.randomUUID().toString() + "_" + uploadedFile.getOriginalFilename();
            Path filePath = Paths.get(uploadPath, filename);
            Files.copy(uploadedFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            ProductImage productImage = new ProductImage();
            productImage.setProduct(product);
            // productImage.setImageUrl(filePath.toString());
            productImage.setImageUrl(filename);
            productImageRepository.save(productImage);
        }

        // String filename = UUID.randomUUID().toString() + "_" +
        // file.getOriginalFilename();
        // Path filePath = Paths.get(uploadPath, filename);
        // Files.copy(file.getInputStream(), filePath,
        // StandardCopyOption.REPLACE_EXISTING);

        // ProductImage productImage = new ProductImage();
        // productImage.setProduct(product);
        // productImage.setImageUrl(filePath.toString());
        // productImageRepository.save(productImage);
    }
}
