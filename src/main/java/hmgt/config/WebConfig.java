package hmgt.config;

import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.context.embedded.MimeMappings;
import org.springframework.boot.web.servlet.ServletContextInitializer;
import org.springframework.context.annotation.Configuration;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import java.io.File;

@Configuration
public class WebConfig implements ServletContextInitializer, EmbeddedServletContainerCustomizer {

    @Override
    public void onStartup(final ServletContext servletContext) throws ServletException {

    }

    @Override
    public void customize(final ConfigurableEmbeddedServletContainer container) {
        container.setMimeMappings(new MimeMappings(MimeMappings.DEFAULT));
        setLocationForStaticAssets(container);
    }

    private void setLocationForStaticAssets(ConfigurableEmbeddedServletContainer container) {
        final File root = new File("src/main/webapp/");
        if (root.exists() && root.isDirectory()) {
            container.setDocumentRoot(root);
        }
    }
}
