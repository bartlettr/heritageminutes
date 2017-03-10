package hmgt.rest;

import com.datastax.driver.core.utils.UUIDs;
import com.google.common.collect.Lists;
import hmgt.model.Location;
import hmgt.model.LocationCategory;
import hmgt.model.Minute;
import hmgt.repository.LocationCategoryRepository;
import hmgt.repository.LocationRepository;
import hmgt.repository.MinuteRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.cassandra.repository.MapId;
import org.springframework.data.cassandra.repository.support.BasicMapId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class MinuteResource {

    private final LocationRepository locationRepository;
    private final LocationCategoryRepository locationCategoryRepository;
    private final MinuteRepository minuteRepository;

    @Autowired
    public MinuteResource(final MinuteRepository minuteRepository,
                          final LocationRepository locationRepository,
                          final LocationCategoryRepository locationCategoryRepository) {
        this.minuteRepository = minuteRepository;
        this.locationRepository = locationRepository;
        this.locationCategoryRepository = locationCategoryRepository;
    }

    @GetMapping("/minutes")
    public ResponseEntity<?> getMinutes(@RequestParam(required = false) final Integer page,
                                        @RequestParam(required = false) final Integer limit) {
        final List<Minute> minutes = Lists.newArrayList(minuteRepository.findAll());
        Collections.sort(minutes);

        if(page != null && limit != null) {
            final int start = (page - 1) * limit;
            minutes.subList(start, start + (limit - 1));
            return ResponseEntity.ok(new Page<>(minutes.size(), minutes.subList(start, start + limit)));
        }
        return ResponseEntity.ok(new Page<>(minutes.size(), minutes));
    }

    @PostMapping("/minutes")
    public ResponseEntity<?> createMinute(@RequestBody final Minute minute) {
        minute.setId(UUIDs.timeBased());
        minuteRepository.save(minute);
        return ResponseEntity.ok(minute.getId());
    }

    @GetMapping("/minutes/{id}")
    public ResponseEntity<?> getMinute(@PathVariable final String id) {
        final UUID uuid = UUID.fromString(id);
        final MapId mapId = new BasicMapId().with("id", uuid);
        final Minute minute = minuteRepository.findOne(mapId);
        if(minute != null) {
            return ResponseEntity.ok(minute);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/minutes/{id}")
    public ResponseEntity<?> deleteMinute(@PathVariable final String id) {
        final UUID uuid = UUID.fromString(id);
        final MapId mapId = new BasicMapId().with("id", uuid);
        final Minute minute = minuteRepository.findOne(mapId);
        if(minute != null) {
            minuteRepository.delete(minute);
            locationRepository.deleteByMinuteId(uuid);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/minutes/{id}/locations/{group}")
    public ResponseEntity<?> getLocations(@PathVariable final String id, @PathVariable final String group) {
        final UUID uuid = UUID.fromString(id);
        final List<Location> locations = locationRepository.findByMinuteId(uuid);
        if(locations != null) {
            final Location result = locations.stream().filter(location
                    -> Objects.equals(location.getGroup(), group))
                    .findFirst().orElse(null);
            if(result != null) {
                return ResponseEntity.ok(result);
            }
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/minutes/{id}/locations")
    public ResponseEntity<?> createLocation(@PathVariable final String id, @RequestBody final Location location) {
        location.setId(UUIDs.timeBased());
        final UUID uuid = UUID.fromString(id);
        location.setMinuteId(uuid);
        locationRepository.save(location);
        return ResponseEntity.ok(location.getId());
    }

    @PostMapping("/minutes/{minuteId}/locations/{id}")
    public ResponseEntity<?> deleteLocation(@PathVariable final String id) {
        final UUID uuid = UUID.fromString(id);
        final MapId mapId = new BasicMapId().with("id", uuid);
        final Location location = locationRepository.findOne(mapId);
        if(location != null) {
            locationRepository.delete(location);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/locations/categories")
    public ResponseEntity<?> getLocationCategories() {
        final List<LocationCategory> locationCategories = Lists.newArrayList(locationCategoryRepository.findAll());
        return ResponseEntity.ok(locationCategories);
    }

    @PostMapping("/locations/categories")
    public ResponseEntity<?> createLocationCategory(@RequestBody final LocationCategory locationCategory) {
        locationCategory.setId(UUIDs.timeBased());
        locationCategoryRepository.save(locationCategory);
        return ResponseEntity.ok(locationCategory.getId());
    }

    @Getter
    @AllArgsConstructor
    private class Page<T> {
        private int count = 0;
        private List<T> data;
    }
}
