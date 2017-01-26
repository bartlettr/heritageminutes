package hmgt.rest;

import com.datastax.driver.core.utils.UUIDs;
import com.google.common.collect.Lists;
import hmgt.model.Location;
import hmgt.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.cassandra.repository.MapId;
import org.springframework.data.cassandra.repository.support.BasicMapId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class LocationResource {

    private LocationRepository locationRepository;

    @Autowired
    public LocationResource(final LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    @GetMapping("/locations")
    public ResponseEntity<List<Location>> getLocations() {
        final List<Location> locations = Lists.newArrayList(locationRepository.findAll());
        return ResponseEntity.ok(locations);
    }

    @PostMapping("/locations")
    public ResponseEntity<?> createLocation(@RequestBody final Location location) {
        location.setId(UUIDs.timeBased());
        locationRepository.save(location);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/locations/{id}")
    public ResponseEntity<?> getLocation(@PathVariable final String id) {
        final UUID uuid = UUID.fromString(id);
        final MapId mapId = new BasicMapId().with("id", uuid);
        final Location location = locationRepository.findOne(mapId);
        if(location != null) {
            return ResponseEntity.ok(location);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/locations/{id}")
    public ResponseEntity<?> createLocation(@PathVariable final String id) {
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
