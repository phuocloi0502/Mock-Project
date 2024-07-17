package VTIFOOD.VTI_Food.specification;

import VTIFOOD.VTI_Food.form.CategoryFilterForm;
import VTIFOOD.VTI_Food.model.Category;
import jakarta.persistence.criteria.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

public class CategorySpecification {

    public static Specification<Category> buildWhere(String search, CategoryFilterForm form) {

        Specification<Category> where = null;
        if(!StringUtils.isEmpty(where)){
            search = search.trim();
            CategoryCustomSpecification name = new CategoryCustomSpecification("name", search);
            where = Specification.where(name);
        }
        return where;
    }


}

@Data
@AllArgsConstructor
class CategoryCustomSpecification implements Specification<Category> {

    @NonNull
    private String field;

    @NonNull
    private Object value;

    @Override
    public Predicate toPredicate(Root<Category> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        if (field.equalsIgnoreCase("name")) {
            Join<?, ?> join = root.join("products", JoinType.LEFT);
            Expression<String> productNamePath = join.get("name");
            return criteriaBuilder.like(productNamePath, "%" + value.toString() + "%");
        }
        return null;
    }
}