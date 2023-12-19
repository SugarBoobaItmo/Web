package momsDeveloper.itmoweb.lab3.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.With;

@Entity
@Data
@With
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "points")
public class Point {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(nullable = false, name = "x")
    private Double x;

    @Column(nullable = false, name = "y")
    private Double y;

    @Column(nullable = false, name = "r")
    private Double r;

    @Column(nullable = false, name = "result")
    private Boolean result;

    @Column(nullable = false, name = "time")
    private String time;

    @Column(nullable = false, name = "execution_time")
    private String executionTime;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User owner;
}
