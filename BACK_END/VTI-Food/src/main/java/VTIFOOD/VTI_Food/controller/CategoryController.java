package VTIFOOD.VTI_Food.controller;

import VTIFOOD.VTI_Food.DTO.CategoryDTO;
import VTIFOOD.VTI_Food.DTO.response.UpdateCategoryResponse;
import VTIFOOD.VTI_Food.exception.DataNotFoundException;
import VTIFOOD.VTI_Food.form.CategoryFilterForm;
import VTIFOOD.VTI_Food.model.Category;
import VTIFOOD.VTI_Food.service.entityservice.CategoryService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.LocaleResolver;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/categories")
public class CategoryController {

    private final CategoryService categoryService;
    private final ModelMapper modelMapper;
    private final MessageSource messageSource;
    private final LocaleResolver localeResolver;

    @PostMapping("")
    public ResponseEntity<?> insertCategories(@Valid @RequestBody CategoryDTO categoryDTO,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> message = bindingResult.getFieldErrors().stream().map(FieldError::getDefaultMessage)
                    .toList();
            return ResponseEntity.badRequest().body(message);
        }
        categoryService.createCategory(categoryDTO);
        return ResponseEntity.ok("Thêm danh mục thanh cong");
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<?> getCategoryById(@PathVariable(name = "id") long id) {
        Category category = categoryService.getCategoryById(id);
        CategoryDTO categoryDTO = modelMapper.map(category, CategoryDTO.class);
        categoryDTO.add(linkTo(methodOn(CategoryController.class).getCategoryById(id)).withSelfRel());
        return ResponseEntity.ok(categoryDTO);
    }

    @GetMapping()
    public ResponseEntity<?> getAllCategories(
            Pageable pageable, @RequestParam(name = "search", required = false) String search, CategoryFilterForm form)
            throws Exception {
        Page<Category> categories = categoryService.getAllCategories(pageable, form, search);
        List<CategoryDTO> categoryDTOS = categories.stream().map(
                category -> modelMapper.map(category, CategoryDTO.class)).collect(Collectors.toList());
        for (CategoryDTO categoryDTO : categoryDTOS) {
            for (CategoryDTO.ProductDTO productDTO : categoryDTO.getProducts()) {
                productDTO.add(
                        linkTo(methodOn(ProductController.class).getProductById(productDTO.getId())).withSelfRel());
            }
            categoryDTO
                    .add(linkTo(methodOn(CategoryController.class).getCategoryById(categoryDTO.getId())).withSelfRel());
        }
        PageImpl<CategoryDTO> categoryDTOPage = new PageImpl<>(categoryDTOS, pageable, categories.getTotalElements());
        return ResponseEntity.ok(categoryDTOPage);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UpdateCategoryResponse> updateCategory(@PathVariable(value = "id") long id,
            @RequestBody CategoryDTO categoryDTO,
            HttpServletRequest request) {
        try {

            Category findCategory = categoryService.updateCategory(id, categoryDTO);
            CategoryDTO updatedCategoryDTO = modelMapper.map(findCategory, CategoryDTO.class);
            Locale locale = localeResolver.resolveLocale(request);
            return ResponseEntity.ok(UpdateCategoryResponse.builder()
                    .message(messageSource.getMessage("category.update.successfully", null, locale))
                    .build());
        } catch (DataNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable(value = "id") long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok("Delete categories success with id: " + id);
    }
}
