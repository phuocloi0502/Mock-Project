package VTIFOOD.VTI_Food.service.serviceImpl;

import VTIFOOD.VTI_Food.DTO.CategoryDTO;
import VTIFOOD.VTI_Food.exception.DataNotFoundException;
import VTIFOOD.VTI_Food.form.CategoryFilterForm;
import VTIFOOD.VTI_Food.model.Category;
import VTIFOOD.VTI_Food.repository.CategoryRepository;
import VTIFOOD.VTI_Food.service.entityservice.CategoryService;
import VTIFOOD.VTI_Food.specification.CategorySpecification;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ModelMapper modelMapper;
    @Override
    public void createCategory(CategoryDTO categoryDTO) {
        Category insertCategory = Category.builder()
                .name(categoryDTO.getName()).
                build();
        categoryRepository.save(insertCategory);
    }

    @Override
    public Category getCategoryById(long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    @Override
    public Page<Category> getAllCategories(Pageable pageable,CategoryFilterForm form, String search) {
        Specification<Category> name = CategorySpecification.buildWhere(search,form);
        return categoryRepository.findAll(name, pageable);
    }


    @Override
    public Category updateCategory(long categoryId, CategoryDTO categoryDTO) throws DataNotFoundException {
        Category existingCategory = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new DataNotFoundException("Cannot find category with id: " + categoryId));
        existingCategory.setName(categoryDTO.getName());
        return categoryRepository.save(existingCategory);
    }

    @Override
    public void deleteCategory(long id) {
        categoryRepository.deleteById(id);
    }
}
