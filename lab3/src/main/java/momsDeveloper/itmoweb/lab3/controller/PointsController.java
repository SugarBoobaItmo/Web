package momsDeveloper.itmoweb.lab3.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import momsDeveloper.itmoweb.lab3.dtos.PointDto;
import momsDeveloper.itmoweb.lab3.service.PointService;

@RestController
@RequestMapping("/api/points")
@RequiredArgsConstructor
public class PointsController {
    private final PointService pointService;

    @GetMapping("/all")
    public List<PointDto> getPoints() {
        return pointService.findAll();
    }

    @PostMapping("/add")
    public List<PointDto> postPoint(@RequestBody PointDto pointDto) {
        pointService.save(pointDto);
        return pointService.findAll();

    }
    
    @PostMapping("/delete")
    public void clearPoints() {
        pointService.deleteUserPoints();
    }

}
