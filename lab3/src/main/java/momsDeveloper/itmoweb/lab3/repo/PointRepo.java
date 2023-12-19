package momsDeveloper.itmoweb.lab3.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import momsDeveloper.itmoweb.lab3.model.entity.Point;

@Repository
public interface PointRepo extends CrudRepository<Point, Long> {

    Optional<Point> getByXAndYAndR(double x, double y, double r);

    void save(Optional<Point> pointRes);

    void deleteAll();

    List<Point> findAll();
}
