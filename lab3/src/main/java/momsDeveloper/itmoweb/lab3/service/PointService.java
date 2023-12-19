package momsDeveloper.itmoweb.lab3.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import momsDeveloper.itmoweb.lab3.dtos.PointDto;
import momsDeveloper.itmoweb.lab3.model.entity.Point;
import momsDeveloper.itmoweb.lab3.repo.PointRepo;

@Service
@AllArgsConstructor
public class PointService {
    private PointRepo pointRepo;

    public void deleteAll() {
        pointRepo.deleteAll();
    }

    public void save(PointDto pointRes) {
        pointRepo.save(mapToPoint(pointRes));
    }

    public List<PointDto> findAll() {
        List<Point> points = pointRepo.findAll();
        return points.stream().map((point) -> mapToPointDto(point)).toList();
    }

    public static PointDto mapToPointDto(Point point) {
        return PointDto.builder()
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
