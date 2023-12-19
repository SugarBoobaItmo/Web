package momsDeveloper.itmoweb.lab3.dtos;

import org.springframework.lang.NonNull;

import lombok.Data;

@Data
public class JwtRequest {
    @NonNull
    private String login;
    @NonNull
    private String password;
}
