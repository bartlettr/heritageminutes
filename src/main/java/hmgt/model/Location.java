package hmgt.model;

import com.datastax.driver.core.utils.UUIDs;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.csv.CSVRecord;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.cassandra.mapping.PrimaryKey;
import org.springframework.data.cassandra.mapping.Table;

import java.util.Date;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
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

    public static Location fromRow(final CSVRecord row) {
        final String[] cityProvince = row.get(8).split(",");
        final String city = cityProvince[0].trim();
        String province = "";
        if(cityProvince.length > 1) {
            province = cityProvince[1].trim();
        }

        float lat = 0;
        if(StringUtils.isNotBlank(row.get(9))) {
            lat = Float.parseFloat(row.get(9));
        }

        float lng = 0;
        if(StringUtils.isNotBlank(row.get(10))) {
            lng = Float.parseFloat(row.get(10));
        }


        return Location.builder()
                .id(UUIDs.timeBased())
                .name(row.get(6))
                .whyHere(row.get(5))
                .address(row.get(7))
                .city(city)
                .province(province)
                .sources(row.get(11))
                .lat(lat)
                .lng(lng)
                .build();
    }
}