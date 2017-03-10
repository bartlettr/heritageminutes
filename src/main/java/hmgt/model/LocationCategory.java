package hmgt.model;

import lombok.*;
import org.springframework.data.cassandra.mapping.PrimaryKey;
import org.springframework.data.cassandra.mapping.Table;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(value = "locationCategories")
public class LocationCategory {
    @PrimaryKey
    private UUID id;
    private String name;
    private String uri;
}
