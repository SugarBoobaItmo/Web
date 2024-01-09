package momsDeveloper.itmoweb.lab3.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import momsDeveloper.itmoweb.lab3.dtos.PointDto;
import momsDeveloper.itmoweb.lab3.exceptions.AppError;
import momsDeveloper.itmoweb.lab3.service.PointService;

@RestController
@RequestMapping("/api/points")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class PointsController {
    private final PointService pointService;

    @GetMapping("/all")
    public List<PointDto> getPoints() {
        return pointService.findAll();
    }

    @PostMapping("/add")
    public ResponseEntity<?> postPoint(@RequestBody PointDto pointDto) {
        try {
            pointService.save(pointDto);
            return new ResponseEntity<>(pointService.findAll(), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(new AppError(HttpStatus.BAD_REQUEST.value(), e.getMessage()),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<?> clearPoints() {
        pointService.deleteUserPoints();
        return new ResponseEntity<>(pointService.findAll(), HttpStatus.OK);
    }

    @PostMapping("/changeArea")
    public ResponseEntity<?> changeArea(@RequestBody PointDto pointDto) {
        try {
            pointService.changeArea(pointDto.getR());
            return new ResponseEntity<>(pointService.findAll(), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(new AppError(HttpStatus.BAD_REQUEST.value(), e.getMessage()),
                    HttpStatus.BAD_REQUEST);
        }
    }
}
