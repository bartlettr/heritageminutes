package hmgt.repository;

import hmgt.model.Location;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.cassandra.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface LocationRepository extends CassandraRepository<Location> {

    @Query("SELECT * FROM locations WHERE minuteId=?0 ALLOW FILTERING")
    List<Location> findByMinuteId(UUID minuteId);

    @Query("DELETE FROM locations WHERE minuteId=?0")
    void deleteByMinuteId(UUID minuteId);
}
