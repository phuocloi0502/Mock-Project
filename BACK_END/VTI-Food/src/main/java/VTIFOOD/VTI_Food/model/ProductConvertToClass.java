package VTIFOOD.VTI_Food.model;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class ProductConvertToClass implements AttributeConverter<Product.ProductStatus, String> {

    @Override
    public String convertToDatabaseColumn(Product.ProductStatus attribute) {
        if(attribute == null){
            return null;
        }
        return attribute.getValue();
    }

    @Override
    public Product.ProductStatus convertToEntityAttribute(String dbData) {
        if(dbData == null){
            return null;
        }
        return Product.ProductStatus.toEnum(dbData);
    }
}
