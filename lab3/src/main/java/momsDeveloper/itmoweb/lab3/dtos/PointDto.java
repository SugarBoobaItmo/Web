package momsDeveloper.itmoweb.lab3.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class PointDto {
    private Long id;
    private Double x;
    private Double y;
    private Double r;
    private Boolean result;
    private String time;
    private String executionTime;
    private String owner;

}
