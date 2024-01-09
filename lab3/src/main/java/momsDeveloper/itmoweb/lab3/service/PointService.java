package momsDeveloper.itmoweb.lab3.service;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import momsDeveloper.itmoweb.lab3.dtos.PointDto;
import momsDeveloper.itmoweb.lab3.model.entity.Point;
import momsDeveloper.itmoweb.lab3.model.entity.User;
import momsDeveloper.itmoweb.lab3.repo.PointRepo;
import momsDeveloper.itmoweb.lab3.repo.UserRepo;
import momsDeveloper.itmoweb.utils.AreaValidator;
import momsDeveloper.itmoweb.utils.SecurityUtil;

@Service
@AllArgsConstructor
public class PointService {
    private PointRepo pointRepo;

    private UserRepo userRepo;

    public void deleteUserPoints() {
        String username = SecurityUtil.getSessionUser();
        List<Point> points = pointRepo.searchByOwnerLogin(username);
        points.forEach((point) -> pointRepo.deleteById(point.getId()));
    }

    public void save(PointDto pointRes) {
        String username = SecurityUtil.getSessionUser();
        Optional<User> user = userRepo.getByLogin(username);
        if (user.isEmpty()) {
            throw new IllegalArgumentException("Cannot identify owner.");
        }
        pointRes.setOwner(UserService.mapToUserDto(user.get()));

        final long start = System.nanoTime();
        pointRes.setTime(java.time.LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss")));

        var x = pointRes.getX();
        var y = pointRes.getY();
        var r = pointRes.getR();

        var result = AreaValidator.checkArea(x, y, r);
        pointRes.setResult(result);
        pointRes.setExecutionTime(String.format("%.9f", (System.nanoTime() - start) / 1000000000.0));

        pointRepo.save(mapToPoint(pointRes));
    }

    public void deleteAll() {
        pointRepo.deleteAll();
    }

    public List<PointDto> findAll() {
        String username = SecurityUtil.getSessionUser();
        List<Point> points = pointRepo.searchByOwnerLogin(username);
        return points.stream().map((point) -> mapToPointDto(point)).toList();
    }

    public List<PointDto> changeArea(Double r) {
        String username = SecurityUtil.getSessionUser();
        List<Point> points = pointRepo.searchByOwnerLogin(username);
        points.forEach((point) -> {
            final long start = System.nanoTime();
            var x = point.getX();
            var y = point.getY();
            point.setR(r);
            var result = AreaValidator.checkArea(x, y, r);
            point.setResult(result);
            point.setTime(java.time.LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss")));
            point.setExecutionTime(String.format("%.9f", (System.nanoTime() - start) / 1000000000.0));
        });
        pointRepo.saveAll(points);
        return points.stream().map((point) -> mapToPointDto(point)).toList();

    }

    public static PointDto mapToPointDto(Point point) {
        return PointDto.builder()
                .id(point.getId())
                .x(point.getX())
                .y(point.getY())
                .r(point.getR())
                .result(point.getResult())
                .time(point.getTime())
                .executionTime(point.getExecutionTime())
                .owner(UserService.mapToUserDto(point.getOwner()))
                .build();
    }

    public static Point mapToPoint(PointDto pointDto) {
        return new Point()
                .withX(pointDto.getX())
                .withY(pointDto.getY())
                .withR(pointDto.getR())
                .withResult(pointDto.getResult())
                .withTime(pointDto.getTime())
                .withExecutionTime(pointDto.getExecutionTime())
                .withOwner(UserService.mapToUser(pointDto.getOwner()));
    }
}
