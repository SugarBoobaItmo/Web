package momsDeveloper.itmoweb.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Data;
import lombok.extern.jackson.Jacksonized;

@Data
@Jacksonized
@Builder
public class RegistrationUserDto {
    private String login;
    private String password;

    @JsonProperty("confirm_password")
    private String confirmPassword;
}
