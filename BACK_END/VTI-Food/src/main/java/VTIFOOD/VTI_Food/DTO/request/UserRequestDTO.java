package VTIFOOD.VTI_Food.DTO.request;

import VTIFOOD.VTI_Food.utils.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserRequestDTO implements Serializable {

    @NotBlank(message = "Firstname is required")
    @Size(max = 100, message = "Firstname must not exceed 100 characters")
    private String firstName;

    @NotBlank(message = "Lastname is required")
    @Size(max = 100, message = "Lastname must not exceed 100 characters")
    private String lastName;

    @NotBlank(message = "Phone number is required")
//    @Pattern(regexp = "^\\d{10}$", message = "Phone number must be 10 digits")
    @PhoneNumber
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


    private String retypePassword;


    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @NotNull(message = "Date of birth must be null")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate dob;

    @Size(max = 200, message = "Address must not exceed 200 characters")
    private String address;

    @JsonProperty("role_id")
    @NotNull(message = "Role ID is required")
    private Long roleId;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt; // add this field

    private LocalDateTime updatedAt;

//    @EnumPattern(name = "status", regexp = "ACTIVE|INACTIVE|NONE")
//    private UserStatus status;
//
//    @GenderSubset(anyOf = {Gender.MALE, Gender.FEMALE, Gender.OTHER})
//    private Gender gender;
//
//    @NotNull(message = "type must be not null")
//    @EnumValue(name = "type", enumClass = UserType.class)
//    private String type;
//
//    private boolean isActive = true;
//
//    @NotEmpty
//    private List<String> permission;
}
