package VTIFOOD.VTI_Food.specification;

import VTIFOOD.VTI_Food.form.ProductFilterForm;
import VTIFOOD.VTI_Food.model.Product;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

@SuppressWarnings("desprecation")
public class ProductSpecification{
    public static Specification<Product> buildWhere(String search, ProductFilterForm form) {
        Specification<Product> where = null;
        if (!StringUtils.isEmpty(search)) {
            search = search.trim();
            ProductCustom name = new ProductCustom("name", search);
            where = Specification.where(name);
        }
        return where;
    }
}
@RequiredArgsConstructor
@SuppressWarnings("serial")
class ProductCustom implements Specification<Product> {

    @NonNull
    private String field;

    @NonNull
    private Object value;
    @Override
    public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        if(field.equalsIgnoreCase("name")){
            return criteriaBuilder.like(root.get("name"), "%" + value.toString() + "%");
        }
        return null;
    }
}
