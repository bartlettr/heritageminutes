package hmgt.repository;

import hmgt.model.Location;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends CassandraRepository<Location> {

}
