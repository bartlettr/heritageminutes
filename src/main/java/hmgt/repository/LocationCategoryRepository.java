package hmgt.repository;

import hmgt.model.LocationCategory;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationCategoryRepository extends CassandraRepository<LocationCategory> {

}
