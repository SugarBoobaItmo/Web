package momsDeveloper.itmoweb.lab3.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import momsDeveloper.itmoweb.lab3.dtos.JwtRequest;
import momsDeveloper.itmoweb.lab3.dtos.RegistrationUserDto;
import momsDeveloper.itmoweb.lab3.service.AuthService;
import momsDeveloper.itmoweb.utils.SecurityUtil;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody JwtRequest authRequest) {
        return authService.createAuthToken(authRequest);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegistrationUserDto registrationUser) {
        return authService.createNewUser(registrationUser);
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validate() {
        String username = SecurityUtil.getSessionUser();
        if (username == null) {
            return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body("User is not logged in.");
        }
        return ResponseEntity.ok().body(username);
    }
}
