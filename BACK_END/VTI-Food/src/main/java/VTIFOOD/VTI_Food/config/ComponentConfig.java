package VTIFOOD.VTI_Food.config;

import VTIFOOD.VTI_Food.DTO.ProductDTO;
import VTIFOOD.VTI_Food.model.Product;
import lombok.AccessLevel;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ComponentConfig {
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setFieldMatchingEnabled(true).setFieldAccessLevel(org.modelmapper.config.Configuration.AccessLevel.PRIVATE);
        modelMapper.typeMap(ProductDTO.class, Product.class).addMappings(mapper -> mapper.skip(Product::setId));
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        return new ModelMapper();
    }
}
