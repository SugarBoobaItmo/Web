package momsDeveloper.itmoweb.lab3.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import momsDeveloper.itmoweb.lab3.model.entity.Role;
import momsDeveloper.itmoweb.lab3.repo.RoleRepo;

@Service
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepo roleRepo;

    public Role getUserRole() {
        return roleRepo.findByName("ROLE_USER").get();
    }
}
