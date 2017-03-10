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
import java.util.HashMap;
import java.util.Map;
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

            Map<String, Integer> columns = null;
            for(CSVRecord row : parser.getRecords()) {
                if(Objects.equals("Number", row.get(0))) {
                    columns = getColumns(row);
                } else {
                    processRow(columns, row);
                }
            }

            reader.close();
        } catch(IOException ex) {
            ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    private Map<String, Integer> getColumns(final CSVRecord row) {
        final Map<String, Integer> columns = new HashMap<>();
        for(int x = 0; x < row.size(); x++) {
            columns.put(row.get(x), x);
        }
        return columns;
    }

    private void processRow(final Map<String, Integer> columns, final CSVRecord row) {
        final Minute minute = minuteRepository.findByName(row.get(columns.get("Minute")))
                .orElse(minuteRepository.save(Minute.fromRow(columns, row)));
        final Location location = Location.fromRow(columns, row);
        location.setMinuteId(minute.getId());
        locationRepository.save(location);
    }
}
