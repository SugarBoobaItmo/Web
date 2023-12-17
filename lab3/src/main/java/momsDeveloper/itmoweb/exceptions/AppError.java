package momsDeveloper.itmoweb.exceptions;

import java.sql.Date;

import lombok.Data;

@Data
public class AppError {
    private int status;
    private String message;
    private Date timestamp;

    public AppError(int status, String message) {
        this.status = status;
        this.message = message;
        this.timestamp = new Date(System.currentTimeMillis());
    }
}
