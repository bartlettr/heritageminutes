package hmgt.rest;

import com.datastax.driver.core.utils.UUIDs;
import com.google.common.collect.Lists;
import hmgt.model.Location;
import hmgt.model.Minute;
import hmgt.repository.LocationRepository;
import hmgt.repository.MinuteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.cassandra.repository.MapId;
import org.springframework.data.cassandra.repository.support.BasicMapId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class MinuteResource {

    private final LocationRepository locationRepository;
    private final MinuteRepository minuteRepository;

    @Autowired
    public MinuteResource(final MinuteRepository minuteRepository,
                          final LocationRepository locationRepository) {
        this.minuteRepository = minuteRepository;
        this.locationRepository = locationRepository;
    }

    @GetMapping("/minutes")
    public ResponseEntity<List<Minute>> getMinutes() {
        final List<Minute> locations = Lists.newArrayList(minuteRepository.findAll());
        return ResponseEntity.ok(locations);
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

    @GetMapping("/minutes/{id}/locations")
    public ResponseEntity<?> getLocations(@PathVariable final String id) {
        final UUID uuid = UUID.fromString(id);
        final List<Location> locations = locationRepository.findByMinuteId(uuid);
        if(locations != null) {
            return ResponseEntity.ok(locations);
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
}
