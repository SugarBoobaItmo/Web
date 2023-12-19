package momsDeveloper.itmoweb.dtos;

import org.springframework.lang.NonNull;

import com.fasterxml.jackson.annotation.JsonProperty;

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

    @NonNull
    @JsonProperty("confirm_password")
    private String confirmPassword;
}
