package VTIFOOD.VTI_Food.controller;

import VTIFOOD.VTI_Food.DTO.UserDTO;
import VTIFOOD.VTI_Food.DTO.request.UserLoginDTO;
import VTIFOOD.VTI_Food.DTO.request.UserRequestDTO;
import VTIFOOD.VTI_Food.DTO.request.UserUpdateDTO;
import VTIFOOD.VTI_Food.DTO.response.LoginResponse;
import VTIFOOD.VTI_Food.DTO.response.UserResponseDTO;
import VTIFOOD.VTI_Food.exception.DataNotFoundException;
import VTIFOOD.VTI_Food.exception.PermissionDenyException;
import VTIFOOD.VTI_Food.model.User;
import VTIFOOD.VTI_Food.service.entityservice.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;

import org.springframework.context.MessageSource;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.LocaleResolver;

import java.util.List;
import java.util.Locale;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/users")
public class UserController {

    private final UserService userService;

    private final MessageSource messageSource;

    private final LocaleResolver localResolver;

    @PostMapping(value = "/register")
    public ResponseEntity<?> creatUser(@Valid @RequestBody UserRequestDTO userRequestDTO)
            throws DataNotFoundException, PermissionDenyException {
        if (!userRequestDTO.getPassword().equals(userRequestDTO.getRetypePassword())) {
            return ResponseEntity.badRequest().body("Password dose not match");
        }
        User user = userService.createUser(userRequestDTO);
        UserResponseDTO userResponseDTO = UserResponseDTO.convertToResponseDTO(user);
        return ResponseEntity.ok(userResponseDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody @Valid UserLoginDTO userLoginDTO,
            HttpServletRequest request) {
        try {
            String token = userService.loginUser(userLoginDTO.getUsername(), userLoginDTO.getPassword());
            Locale locale = localResolver.resolveLocale(request);
            return ResponseEntity.ok(LoginResponse.builder()
                    .message(messageSource.getMessage("user.login.login_successfully", null, locale))
                    .token(token)
                    .build());

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    LoginResponse.builder()
                            .message(e.getMessage())
                            .build());
        }
    }

    @GetMapping()
    public ResponseEntity<?> getAllUsers() {
        List<UserResponseDTO> userResponseDTOS = userService.getALLUsers();
        return ResponseEntity.ok(userResponseDTOS);
    }

//    @GetMapping("/{userId}")
//    public Optional<User> getUserById(@PathVariable Long userId) {
//        return userService.getUserById(userId);
//    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @Valid @RequestBody UserUpdateDTO userUpdateDTO)
            throws DataNotFoundException {
        UserResponseDTO updatedUser = userService.updateUser(id, userUpdateDTO);
        return ResponseEntity.ok(updatedUser);
    }

    @PatchMapping("/{userId}")
    public String changStatus(@PathVariable int userId, @RequestParam(required = false) boolean status) {
        System.out.println("Change user status with id: " + userId);
        return "User status change";
    }

    @DeleteMapping("/{userId}")
    public String deleteUser(@Min(1) @PathVariable int userId) {
        System.out.println("User deleted success with id: " + userId);
        return "User deleted ok";
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
