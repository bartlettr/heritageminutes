package hmgt.repository;

import hmgt.model.Blog;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogRepository extends CassandraRepository<Blog> {

}