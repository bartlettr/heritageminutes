package hmgt.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.cassandra.mapping.PrimaryKey;
import org.springframework.data.cassandra.mapping.Table;

import java.util.UUID;

@Data
@NoArgsConstructor
@Table(value = "locations")
public class Location {
    @PrimaryKey
    private UUID id;
    private String title;
    private String description;
}