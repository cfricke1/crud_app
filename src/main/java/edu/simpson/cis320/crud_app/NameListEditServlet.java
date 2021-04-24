package edu.simpson.cis320.crud_app;

import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


@WebServlet(name = "NameListEditServlet", value = "/api/name_list_edit")
public class NameListEditServlet extends HttpServlet {
    private final static Logger log = Logger.getLogger(PersonDAO.class.getName());
    private Pattern firstValidationPattern;
    private Pattern lastValidationPattern;
    private Pattern emailValidationPattern;
    private Pattern phoneValidationPattern;
    private Pattern birthdayValidationPattern;

    public NameListEditServlet() {
        // --- Compile and set up all the regular expression patterns here ---
        firstValidationPattern = Pattern.compile("^[^0-9]{1,25}$");
        lastValidationPattern = Pattern.compile("^[^0-9]{1,25}$");
        emailValidationPattern = Pattern.compile("^[^0-9]{1,25}$");
        phoneValidationPattern = Pattern.compile("^(\\d{3})-(\\d{3})-(\\d{4})$");
        birthdayValidationPattern = Pattern.compile("^\\d{4}\\-\\d{2}\\-\\d{2}$");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // You can output in any format, text/JSON, text/HTML, etc. We'll keep it simple //
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        // Print that this is a get, not a post
        out.println("Get");

        // Grab the data we got via a parameter
        String fieldname = request.getParameter("fieldname");

        // Just print the data out to confirm we got it.
        out.println("fieldname='" + fieldname + "'");

        // Now create matcher object.
        Matcher first = firstValidationPattern.matcher(fieldname);
        if (first.find()) {
            out.println("success");
        } else {
            out.println("error");
            return;
        }

        // Now create matcher object. //
        Matcher last = lastValidationPattern.matcher(fieldname);
        if (last.find()) {
            out.println("success");
        } else {
            out.println("error");
            return;
        }

        // Now create matcher object.//
        Matcher email = emailValidationPattern.matcher(fieldname);
        if (email.find()) {
            out.println("success");
        } else {
            out.println("error");
            return;
        }

        // Now create matcher object.
        Matcher phone = phoneValidationPattern.matcher(fieldname);
        if (phone.find()) {
            out.println("success");
        } else {
            out.println("error");
            return;
        }

        // Now create matcher object. //
        Matcher birthday = birthdayValidationPattern.matcher(fieldname);
        if (birthday.find()) {
            out.println("success");
        } else {
            out.println("error");
            return;
        }
        ;
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        log.log(Level.FINE, "Insert Data");

        // Get setup up to output JSON text
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        // Open the request for reading. Read in each line, put it into a string.
        // Yes, I think there should be an easier way.
        java.io.BufferedReader in = request.getReader();
        String requestString = new String();
        for (String line; (line = in.readLine()) != null; requestString += line) ;

        // Log the string we got as a request, just as a check
        log.log(Level.INFO, requestString);

        // Great! Now we want to parse the object, and pop it into our business object. Field
        // names have to match. That's the magic.
        Jsonb jsonb = JsonbBuilder.create();
        Person person = jsonb.fromJson(requestString, Person.class);

        // Log info as a check
        log.log(Level.INFO, "Object test: " + person.getFirst());

        // Send something back to the client. Really, we should send a JSON, but
        // we'll keep things simple.
        out.println("Object test: " + person.getFirst());

        PersonDAO.addPerson(person);

    }
}