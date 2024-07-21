package VTIFOOD.VTI_Food.DTO.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class UserUpdateDTO {
    private String username;
    // private String password;
    private String firstName;
    private String lastName;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate dob;
    private String email;
    private String address;
    private String phoneNumber;
    private Long roleId; // Nếu bạn muốn cho phép cập nhật vai trò của người dùng
}