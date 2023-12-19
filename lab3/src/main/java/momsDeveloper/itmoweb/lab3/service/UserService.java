package momsDeveloper.itmoweb.lab3.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import momsDeveloper.itmoweb.lab3.dtos.RegistrationUserDto;
import momsDeveloper.itmoweb.lab3.model.entity.Role;
import momsDeveloper.itmoweb.lab3.model.entity.User;
import momsDeveloper.itmoweb.lab3.repo.UserRepo;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepo repository;
    @Autowired
    private RoleService roleService;
    @Autowired
    @Lazy
    private PasswordEncoder passwordEncoder;

    public Optional<User> getByLogin(String login) {
        return repository.getByLogin(login);
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = getByLogin(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return new org.springframework.security.core.userdetails.User(
                user.getLogin(),
                user.getPassword(),
                user.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.getName()))
                        .collect(Collectors.toList()));
    }

    public User createNewUser(RegistrationUserDto user) {
        User newUser = new User();
        newUser.setLogin(user.getLogin());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        Role userRole = roleService.getUserRole();
        newUser.setRoles(List.of(userRole));
        return repository.save(newUser);
    }
}
