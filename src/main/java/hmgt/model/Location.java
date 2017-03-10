package hmgt.model;

import com.datastax.driver.core.utils.UUIDs;
import lombok.*;
import org.apache.commons.csv.CSVRecord;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.cassandra.mapping.PrimaryKey;
import org.springframework.data.cassandra.mapping.Table;

import java.util.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
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
    private UUID category;
    private String group = "default";
    private float lat;
    private float lng;

    private Date dateCompleted;

    public static Location fromRow(final Map<String, Integer> columns, final CSVRecord row) {
        final String[] cityProvince = row.get(columns.get("City")).split(",");
        final String city = cityProvince[0].trim();
        String province = "";
        if(cityProvince.length > 1) {
            province = cityProvince[1].trim();
        }

        float lat = 0;
        final int latColumn = columns.get("Lat");
        if(StringUtils.isNotBlank(row.get(latColumn))) {
            lat = Float.parseFloat(row.get(latColumn));
        }

        float lng = 0;
        final int lngColumn = columns.get("Long");
        if(StringUtils.isNotBlank(row.get(lngColumn))) {
            lng = Float.parseFloat(row.get(lngColumn));
        }

        final String timeMoneyNoObj = row.get(columns.get("TimeMoneyNoObj"));
        final String group = Objects.equals(timeMoneyNoObj, "Y") ? "stretch" : "default";

        return Location.builder()
                .id(UUIDs.timeBased())
                .name(row.get(columns.get("DestName")))
                .whyHere(row.get(columns.get("WhyHere")))
                .address(row.get(columns.get("Address")))
                .city(city)
                .province(province)
                .sources(row.get(columns.get("Sources")))
                .group(group)
                .lat(lat)
                .lng(lng)
                .build();
    }
}