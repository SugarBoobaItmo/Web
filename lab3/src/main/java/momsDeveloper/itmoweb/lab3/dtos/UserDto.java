package momsDeveloper.itmoweb.lab3.dtos;

import org.springframework.lang.NonNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class UserDto {
    @NonNull
    private Long id;
    @NonNull
    private String login;
}
