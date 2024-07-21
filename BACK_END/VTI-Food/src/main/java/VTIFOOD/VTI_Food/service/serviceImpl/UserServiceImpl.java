package VTIFOOD.VTI_Food.service.serviceImpl;

import VTIFOOD.VTI_Food.DTO.UserDTO;
import VTIFOOD.VTI_Food.DTO.request.UserRequestDTO;
import VTIFOOD.VTI_Food.DTO.request.UserUpdateDTO;
import VTIFOOD.VTI_Food.DTO.response.UserResponseDTO;
import VTIFOOD.VTI_Food.components.JwtTokenUtils;
import VTIFOOD.VTI_Food.exception.DataNotFoundException;
import VTIFOOD.VTI_Food.exception.PermissionDenyException;
import VTIFOOD.VTI_Food.mapper.UserMapper;
import VTIFOOD.VTI_Food.model.Role;
import VTIFOOD.VTI_Food.model.User;
import VTIFOOD.VTI_Food.repository.RoleRepository;
import VTIFOOD.VTI_Food.repository.UserRepository;
import VTIFOOD.VTI_Food.service.entityservice.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    private final JwtTokenUtils jwtTokenUtils;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    @Override
    public User createUser(UserRequestDTO requestDTO) throws DataNotFoundException, PermissionDenyException {
        String username = requestDTO.getUsername();
        if (userRepository.existsByUsername(username)) {
            throw new DataIntegrityViolationException("User already exists");
        }
        Role role = roleRepository.findById(requestDTO.getRoleId())
                .orElseThrow(() -> new DataNotFoundException(("Role not found")));
        if (role.getName().toUpperCase().equals(Role.ADMIN)) {
            throw new PermissionDenyException("You can not register user because you is admin");
        }
        User user = User.builder()
                .firstName(requestDTO.getFirstName())
                .lastName(requestDTO.getLastName())
                .address(requestDTO.getAddress())
                .dob(requestDTO.getDob())
                .email(requestDTO.getEmail())
                .username(requestDTO.getUsername())
                .password(requestDTO.getPassword())
                .phoneNumber(requestDTO.getPhoneNumber())
                .build();
        user.setRole(role);
        String password = requestDTO.getPassword();
        String encodePWD = passwordEncoder.encode(password);
        user.setPassword(encodePWD);
        return userRepository.save(user);
    }

    @Override
    public List<UserResponseDTO> getALLUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(
                UserResponseDTO::convertToResponseDTO).collect(Collectors.toList());
    }

    @Override
    public UserResponseDTO updateUser(Long id, UserUpdateDTO userUpdateDTO) throws DataNotFoundException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("User not found"));

        user.setUsername(userUpdateDTO.getUsername());
        // String password = userUpdateDTO.getPassword();
        // String encodePWD = passwordEncoder.encode(password);
        // user.setPassword(encodePWD);

        user.setFirstName(userUpdateDTO.getFirstName());
        user.setLastName(userUpdateDTO.getLastName());
        user.setDob(userUpdateDTO.getDob());
        user.setEmail(userUpdateDTO.getEmail());
        user.setAddress(userUpdateDTO.getAddress());
        user.setPhoneNumber(userUpdateDTO.getPhoneNumber());
        user.setUpdatedAt(LocalDateTime.now());

        // Nếu bạn muốn cập nhật vai trò của người dùng
        if (userUpdateDTO.getRoleId() != null) {
            Role role = roleRepository.findById(userUpdateDTO.getRoleId())
                    .orElseThrow(() -> new DataNotFoundException("Role not found"));
            user.setRole(role);
        }

        User updatedUser = userRepository.save(user);
        return UserResponseDTO.convertToResponseDTO(updatedUser);
    }

    // @Override
    // public Optional<User> getUserById(Long id) {
    // return userRepository.findById(id);
    // }

    @Override
    public String loginUser(String usn, String pwd) throws Exception {
        Optional<User> users = userRepository.findUserByUsername(usn);
        if (users.isEmpty()) {
            throw new DataNotFoundException("invalid username or password");
        }
        User existingUser = users.get();
        if (!passwordEncoder.matches(pwd, existingUser.getPassword())) {
            throw new BadCredentialsException("wrong username or password");
        }
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                usn, pwd);
        authenticationManager.authenticate(usernamePasswordAuthenticationToken);
        return jwtTokenUtils.generateToken(users.get());

    }

    @Override
    public Optional<UserDTO> getUserById(Long id) {
        return userRepository.findById(id).map(UserMapper::mapUserDto);
    }

}
