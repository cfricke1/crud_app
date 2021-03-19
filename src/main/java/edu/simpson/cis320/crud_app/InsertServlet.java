package edu.simpson.cis320.crud_app;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class InsertServlet extends HttpServlet {

    // This will hold our compiled regular expression
    // You'll need one of these for each field
    // Name it according to the actual field name. Do not use "fieldname"
    private Pattern fieldnameValidationPattern;

    /**
     * Our constructor
     */
    public InsertServlet() {
        // --- Compile and set up all the regular expression patterns here ---
        fieldnameValidationPattern = Pattern.compile("^[A-Za-z]{1,10}$");
    }

    /*
     Handle Post requests
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // You can output in any format, text/JSON, text/HTML, etc. We'll keep it simple
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        // Print that this is a post
        out.println("Post");

        // Grab the data we got via a parameter
        String fieldname = request.getParameter("fieldname");

        // Just print the data out to confirm we got it.
        out.println("fieldname='"+fieldname+"'");

        // Now create matcher object.
        Matcher m = fieldnameValidationPattern.matcher(fieldname);
        if (m.find( )) {
            out.println("success");
        } else {
            out.println("error");
        }
    }
}
