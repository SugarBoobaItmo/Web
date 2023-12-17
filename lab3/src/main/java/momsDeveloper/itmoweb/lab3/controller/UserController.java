package momsDeveloper.itmoweb.lab3.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import momsDeveloper.itmoweb.lab3.model.entity.User;
import momsDeveloper.itmoweb.lab3.repo.UserRepo;

@RestController
@RequestMapping("api/user")
@RequiredArgsConstructor
public class UserController {
    
    private final UserRepo userRepo;

    @GetMapping("info")
    public User getUserDetails(){
        String login = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepo.getByLogin(login).get();
    }
}
