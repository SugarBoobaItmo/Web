package momsDeveloper.itmoweb.lab3.dtos;

import org.springframework.lang.NonNull;

import lombok.Builder;
import lombok.Data;
import lombok.extern.jackson.Jacksonized;

@Data
@Jacksonized
@Builder
public class RegistrationUserDto {
    @NonNull
    private String login;
    @NonNull
    private String password;
}
