package hmgt.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.cassandra.mapping.PrimaryKey;
import org.springframework.data.cassandra.mapping.Table;

import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
@Table(value = "locations")
public class Location {
    @PrimaryKey
    private UUID id;
    private UUID minuteId;

    private String name;
    private String whyHere;
    private String address;
    private String city;
    private String province;
    private String sources;

    private enum LocationType { SANE, SOMEWHAT_INSANE, TOTALLY_INSANE };
    private LocationType type = LocationType.SANE;

    private float lat;
    private float lng;

    private boolean completed;
    private Date dateCompleted;
}