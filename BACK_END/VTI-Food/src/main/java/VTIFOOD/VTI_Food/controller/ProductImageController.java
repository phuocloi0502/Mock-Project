package VTIFOOD.VTI_Food.controller;

import VTIFOOD.VTI_Food.service.ProductImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("${api.prefix}/products")
public class ProductImageController {

    @Autowired
    private ProductImageService productImageService;

    @PostMapping("/{productId}/images")
    public ResponseEntity<?> uploadProductImage(@PathVariable Long productId,
                                                @RequestParam("file")MultipartFile file){
        try {
            productImageService.uploadProductImage(productId,file);
            return ResponseEntity.ok("Image uploaded successfully");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
