package hmgt.model;

import com.datastax.driver.core.utils.UUIDs;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.csv.CSVRecord;
import org.springframework.data.cassandra.mapping.PrimaryKey;
import org.springframework.data.cassandra.mapping.Table;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

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

    public static Minute fromRow(final CSVRecord row) {
        return Minute.builder()
                .id(UUIDs.timeBased())
                .number(Integer.parseInt(row.get(0)))
                .name(row.get(1))
                .url(row.get(2))
                .year(row.get(3))
                .description(row.get(4))
                .harkVagrant(row.get(14))
                .build();
    }
}
