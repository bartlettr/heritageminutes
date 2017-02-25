package hmgt.rest;

import hmgt.model.Location;
import hmgt.model.Minute;
import hmgt.repository.LocationRepository;
import hmgt.repository.MinuteRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.Objects;

@Slf4j
@RestController
@RequestMapping("/api")
public class UploadResource {

    private final LocationRepository locationRepository;
    private final MinuteRepository minuteRepository;

    @Autowired
    public UploadResource(final MinuteRepository minuteRepository,
                          final LocationRepository locationRepository) {
        this.minuteRepository = minuteRepository;
        this.locationRepository = locationRepository;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> handleFileUpload(@RequestParam("file") final MultipartFile file) {
        try {
            final Reader reader = new InputStreamReader(file.getInputStream());
            final CSVParser parser = CSVFormat.DEFAULT.parse(reader);
            for(CSVRecord row : parser.getRecords()) {
                if(Objects.equals("Number", row.get(0))) {
                    continue;
                }
                processRow(row);
            }
            reader.close();
        } catch(IOException ex) {
            ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    private void processRow(final CSVRecord row) {
        final Minute minute = minuteRepository.findByName(row.get(1))
                .orElse(minuteRepository.save(Minute.fromRow(row)));
        final Location location = Location.fromRow(row);
        location.setMinuteId(minute.getId());
        locationRepository.save(location);
    }
}
