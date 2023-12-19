package momsDeveloper.itmoweb.dtos;

import org.springframework.lang.NonNull;

import lombok.Data;

@Data
public class JwtRequest {
    @NonNull
    private String login;
    @NonNull
    private String password;
}
