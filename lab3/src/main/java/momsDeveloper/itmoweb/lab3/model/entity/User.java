package momsDeveloper.itmoweb.lab3.model.entity;

import java.util.ArrayList;
import java.util.Collection;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(unique = true, nullable = false, length = 50, name = "login")
    private String login;

    @Column(nullable = false, length = 100, name = "password")
    private String password;

    @ManyToMany
    @JoinTable(
        name = "users_roles",
        joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")},
        inverseJoinColumns = {@JoinColumn(name = "role_id", referencedColumnName = "id")}
        )
    private Collection<Role> roles = new ArrayList<>();
    
}
