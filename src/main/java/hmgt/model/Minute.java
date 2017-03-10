package hmgt.model;

import com.datastax.driver.core.utils.UUIDs;
import lombok.*;
import org.apache.commons.csv.CSVRecord;
import org.springframework.data.cassandra.mapping.Indexed;
import org.springframework.data.cassandra.mapping.PrimaryKey;
import org.springframework.data.cassandra.mapping.Table;

import java.util.Map;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(value = "minutes")
public class Minute implements Comparable<Minute> {
    @PrimaryKey
    private UUID id;
    private int number;
    private String name;
    private String url;
    private String description;
    private String year;
    private String harkVagrant;

    @Override
    public int compareTo(final Minute other) {
        return getNumber() - other.getNumber();
    }

    public static Minute fromRow(final Map<String, Integer> columns, final CSVRecord row) {
        return Minute.builder()
                .id(UUIDs.timeBased())
                .number(Integer.parseInt(row.get(columns.get("Number"))))
                .name(row.get(columns.get("Minute")))
                .url(row.get(columns.get("URL")))
                .year(row.get(columns.get("Year")))
                .description(row.get(columns.get("MinuteDescription")))
                .harkVagrant(row.get(columns.get("HarkAVagrant")))
                .build();
    }
}
