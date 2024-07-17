package VTIFOOD.VTI_Food.DTO.response;

import VTIFOOD.VTI_Food.model.User;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserInfo {
    private Long userId;
    private String fullName;
    private String address;
    private String email;

    public UserInfo(User user) {
        this.userId = user.getId();
        this.fullName = user.getFirstName() + " " + user.getLastName();
        this.address = user.getAddress();
        this.email = user.getEmail();
    }

    // Getter và Setter
}
