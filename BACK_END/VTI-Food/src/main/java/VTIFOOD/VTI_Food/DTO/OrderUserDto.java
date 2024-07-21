package VTIFOOD.VTI_Food.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
public class OrderUserDto {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dob;
    private String email;
    private String address;
    private String phoneNumber;
//    private RoleDto role;
}
