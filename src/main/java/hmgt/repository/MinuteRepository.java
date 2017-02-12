package hmgt.repository;

import hmgt.model.Minute;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MinuteRepository extends CassandraRepository<Minute> {

}
