package momsDeveloper.itmoweb.lab3.repo;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import momsDeveloper.itmoweb.lab3.model.entity.UserEntity;

public interface UserRepo extends JpaRepository<UserEntity, Integer>{
    
    Optional<UserEntity> findByName(String name);
}
