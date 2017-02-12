package hmgt.config;

import com.datastax.driver.core.Session;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.cassandra.config.CassandraClusterFactoryBean;
import org.springframework.data.cassandra.config.SchemaAction;
import org.springframework.data.cassandra.config.java.AbstractCassandraConfiguration;
import org.springframework.data.cassandra.core.CassandraTemplate;
import org.springframework.data.cassandra.repository.config.EnableCassandraRepositories;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Configuration
@EnableCassandraRepositories(basePackages = "hmgt.repository")
public class CassandraConfig extends AbstractCassandraConfiguration {

    @Value("${hmgt.cassandra.contactPoints}")
    private String contactPoints;

    @Override
    protected String getKeyspaceName() {
        return "heritageminutes";
    }

    @Override
    protected String getContactPoints() {
        return contactPoints;
    }

    @Override
    protected int getPort() {
        return 9042;
    }

    @Bean
    public CassandraTemplate cassandraTemplate(final Session session) {
        return new CassandraTemplate(session);
    }

    @Override
    public SchemaAction getSchemaAction() {
        return SchemaAction.CREATE_IF_NOT_EXISTS;
    }

    @Override
    public String[] getEntityBasePackages() {
        return new String[]{"hmgt.model"};
    }

    @Override
    public List<String> getStartupScripts() {
        final String script = "CREATE KEYSPACE IF NOT EXISTS " + getKeyspaceName() + " WITH durable_writes = true "
                + "AND replication = { 'replication_factor' : 1, 'class' : 'SimpleStrategy' };";
        return Collections.singletonList(script);
    }
}
