package VTIFOOD.VTI_Food.DTO.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UpdateCategoryResponse {
    @JsonProperty("message")
    private String message;

    @JsonProperty("token")
    private String token;
}
