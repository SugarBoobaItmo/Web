package momsDeveloper.itmoweb.dtos;

import org.springframework.lang.NonNull;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtResponse {
    @NonNull
    private String token;
    @NonNull
    private String login;
}
