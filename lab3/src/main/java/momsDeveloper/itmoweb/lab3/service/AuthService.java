package momsDeveloper.itmoweb.lab3.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.AllArgsConstructor;
import momsDeveloper.itmoweb.lab3.dtos.JwtRequest;
import momsDeveloper.itmoweb.lab3.dtos.JwtResponse;
import momsDeveloper.itmoweb.lab3.dtos.RegistrationUserDto;
import momsDeveloper.itmoweb.lab3.dtos.UserDto;
import momsDeveloper.itmoweb.lab3.exceptions.AppError;
import momsDeveloper.itmoweb.lab3.model.entity.User;

@Service
@AllArgsConstructor
public class AuthService {
    private final JwtService jwtService;
    private final UserService userService;
    private final AuthenticationManager authenticationManager;

    public ResponseEntity<?> createAuthToken(@RequestBody JwtRequest authRequest) {

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getLogin(), authRequest.getPassword()));
        } catch (BadCredentialsException e) {
            return new ResponseEntity<>(new AppError(HttpStatus.UNAUTHORIZED.value(), e.getMessage()),
                    HttpStatus.UNAUTHORIZED);
        }
        UserDetails userDetails = userService.loadUserByUsername(authRequest.getLogin());
        String jwtToken = jwtService.generateToken(userDetails);
        String login = userDetails.getUsername();
        return ResponseEntity.ok(new JwtResponse(jwtToken, login));
    }

    public ResponseEntity<?> createNewUser(@RequestBody RegistrationUserDto registrationUser) {
        if (!registrationUser.getPassword().equals(registrationUser.getConfirmPassword())) {
            return new ResponseEntity<>(new AppError(HttpStatus.BAD_REQUEST.value(), "Passwords do not match"),
                    HttpStatus.BAD_REQUEST);
        }
        if (userService.getByLogin(registrationUser.getLogin()).isPresent()) {
            return new ResponseEntity<>(new AppError(HttpStatus.BAD_REQUEST.value(), "User already exists"),
                    HttpStatus.BAD_REQUEST);
        }
        User user = userService.createNewUser(registrationUser);
        return ResponseEntity.ok(new UserDto(user.getId(), user.getLogin()));
    }
}
