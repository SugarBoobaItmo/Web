package momsDeveloper.itmoweb.lab3.repo;

import java.util.Optional;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import momsDeveloper.itmoweb.lab3.model.entity.Role;

@Repository
public interface RoleRepo extends CrudRepository<Role, Integer> {
    Optional<Role> findByName(String name);
    
}
