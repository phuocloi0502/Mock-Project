package VTIFOOD.VTI_Food.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDTO {
    private Integer id;

    @NotBlank(message = "FirstName is required")
    @Size(max = 100, message = "FirstName must not exceed 100 characters")
    private String firstName;

    @NotBlank(message = "LastName is required")
    @Size(max = 100, message = "LastName must not exceed 100 characters")
    private String lastName;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "\\d{10}", message = "Phone number must be 10 digits")
    private String phoneNumber;

    @NotBlank(message = "Username is required")
    @Size(min = 4, max = 50, message = "Username must be between 4 and 50 characters")
    private String username;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;

    @NotBlank(message = "Retype password is required")
    private String retypePassword;

    @Past(message = "Date of birth must be in the past")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;

    @Size(max = 200, message = "Address must not exceed 200 characters")
    private String address;

    private boolean isActive = true;

//    @NotNull(message = "Role ID is required")
//    private Integer roleId;

    private RoleDto role;

    // Getters and setters
}