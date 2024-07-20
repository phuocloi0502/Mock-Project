package VTIFOOD.VTI_Food.config;

import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.DefaultErrorAttributes;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.WebRequest;

import java.util.Map;


@Component
public class CustomerErrorAttributes extends DefaultErrorAttributes {

    @Override
    public Map<String, Object> getErrorAttributes(WebRequest webRequest, ErrorAttributeOptions options) {
        Map<String, Object> errorAttributes = super.getErrorAttributes(webRequest, options);
        Throwable error = getError(webRequest);

        if (error != null) {
            errorAttributes.put("message", error.getMessage());
            errorAttributes.put("localizedMessage", error.getLocalizedMessage());
            errorAttributes.put("cause", error.getCause() != null ? error.getCause().toString() : "N/A");
            errorAttributes.put("stackTrace", error.getStackTrace());
        }

        return errorAttributes;
    }
}
