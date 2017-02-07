package hmgt.repository;

import hmgt.model.Location;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.cassandra.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface LocationRepository extends CassandraRepository<Location> {

    @Query("SELECT * FROM minutes WHERE locationId=?0")
    List<Location> findByLocationId(UUID locationId);
}
