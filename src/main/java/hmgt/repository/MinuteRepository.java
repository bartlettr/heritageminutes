package hmgt.repository;

import hmgt.model.Minute;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.cassandra.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MinuteRepository extends CassandraRepository<Minute> {
    @Query("SELECT * FROM minutes WHERE name = :name ALLOW FILTERING")
    Optional<Minute> findByName(@Param("name") String name);
}
