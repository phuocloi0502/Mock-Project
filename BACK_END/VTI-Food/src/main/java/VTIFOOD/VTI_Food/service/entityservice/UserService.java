package VTIFOOD.VTI_Food.service.entityservice;

import VTIFOOD.VTI_Food.DTO.UserDTO;
import VTIFOOD.VTI_Food.DTO.request.UserRequestDTO;
import VTIFOOD.VTI_Food.DTO.request.UserUpdateDTO;
import VTIFOOD.VTI_Food.DTO.response.UserResponseDTO;
import VTIFOOD.VTI_Food.exception.DataNotFoundException;
import VTIFOOD.VTI_Food.exception.PermissionDenyException;
import VTIFOOD.VTI_Food.model.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface UserService {
    public User createUser(UserRequestDTO requestDTO) throws DataNotFoundException, PermissionDenyException;

    public List<UserResponseDTO> getALLUsers();

    public UserResponseDTO updateUser(Long id, UserUpdateDTO userUpdateDTO) throws DataNotFoundException;

//    public Optional<User> getUserById(Long id);

    String loginUser(String usn, String pwd ) throws Exception;

    Optional<UserDTO> getUserById(Long id);
}
