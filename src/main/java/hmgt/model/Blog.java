package hmgt.model;

import lombok.*;
import org.springframework.data.cassandra.mapping.PrimaryKey;
import org.springframework.data.cassandra.mapping.Table;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(value = "blog")
public class Blog {

    @PrimaryKey
    private UUID id;
    private String title;
    private String post;
    private Date dateCreated;
    private Date datePublished;
    private List<UUID> minutes = new ArrayList<>();
}
