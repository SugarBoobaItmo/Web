package momsDeveloper.itmoweb.lab3.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import momsDeveloper.itmoweb.lab3.dtos.PointDto;
import momsDeveloper.itmoweb.lab3.model.entity.Point;
import momsDeveloper.itmoweb.lab3.repo.PointRepo;
import momsDeveloper.itmoweb.utils.SecurityUtil;

@Service
@AllArgsConstructor
public class PointService {
    private PointRepo pointRepo;

    public void deleteUserPoints() {
        String username = SecurityUtil.getSessionUser();
        List<Point> points = pointRepo.searchByOwnerLogin(username);
        points.forEach((point) -> pointRepo.deleteById(point.getId()));
    }

    public void save(PointDto pointRes) {
        String username = SecurityUtil.getSessionUser();
        pointRes.getOwner().setLogin(username);
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
