package VTIFOOD.VTI_Food.service.entityservice;


import VTIFOOD.VTI_Food.DTO.CategoryDTO;
import VTIFOOD.VTI_Food.form.CategoryFilterForm;
import VTIFOOD.VTI_Food.model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface CategoryService {
    void createCategory(CategoryDTO categoryDTO);
    Category getCategoryById(long id);
    Page<Category> getAllCategories(Pageable pageable, CategoryFilterForm form, String search);
    Category updateCategory(long categoryId, CategoryDTO categoryDTO) throws Exception;
    void deleteCategory(long id);
}
