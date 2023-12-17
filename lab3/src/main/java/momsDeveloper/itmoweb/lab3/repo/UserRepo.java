package momsDeveloper.itmoweb.lab3.repo;


import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import momsDeveloper.itmoweb.lab3.model.entity.User;

@Repository
public interface UserRepo extends CrudRepository<User, Long>{
    
    Optional<User> getByLogin(String login);

    void save(Optional<User> userRes);
}
