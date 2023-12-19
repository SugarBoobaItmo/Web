package momsDeveloper.itmoweb.lab3.model.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

@Entity
@Data
@Builder
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

    @ManyToMany
    @JoinTable(
        name = "users_points",
        joinColumns = {@JoinColumn(name = "point_id", referencedColumnName = "id")},
        inverseJoinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")}
        )
    private String owner;
}
