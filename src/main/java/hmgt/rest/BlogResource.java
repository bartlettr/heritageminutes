package hmgt.rest;

import com.datastax.driver.core.utils.UUIDs;
import com.google.common.collect.Lists;
import hmgt.model.Blog;
import hmgt.model.Minute;
import hmgt.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.cassandra.repository.MapId;
import org.springframework.data.cassandra.repository.support.BasicMapId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class BlogResource {

    private BlogRepository blogRepository;

    @Autowired
    public BlogResource(final BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    @GetMapping("/blogs")
    public ResponseEntity<List<Blog>> getBlogs(@RequestParam(required = false, defaultValue = "false") final boolean includeUnpublished) {
        final List<Blog> allBlogs = Lists.newArrayList(blogRepository.findAll());

        if(includeUnpublished) {
           allBlogs.sort(Comparator.comparing(Blog::getDateCreated));
           return ResponseEntity.ok(allBlogs);
        }

        final List<Blog> publishedBlogs = allBlogs.stream().filter(blog -> blog.getDatePublished() != null).collect(Collectors.toList());
        publishedBlogs.sort(Comparator.comparing(Blog::getDatePublished));
        return ResponseEntity.ok(publishedBlogs);
    }

    @PostMapping("/blogs")
    public ResponseEntity<?> createBlog(@RequestBody final Blog blog) {
        blog.setId(UUIDs.timeBased());
        blogRepository.save(blog);
        return ResponseEntity.ok(blog.getId());
    }

    @GetMapping("/blogs/{id}")
    public ResponseEntity<?> getBlog(final String id) {
        final UUID uuid = UUID.fromString(id);
        final MapId mapId = new BasicMapId().with("id", uuid);
        final Blog minute = blogRepository.findOne(mapId);
        if(minute != null) {
            return ResponseEntity.ok(minute);
        }
        return ResponseEntity.notFound().build();
    }


}
