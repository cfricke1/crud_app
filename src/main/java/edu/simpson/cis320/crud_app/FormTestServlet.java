package edu.simpson.cis320.crud_app;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@WebServlet(name = "FormTestServlet", value = "/api/form_test_servlet")
public class FormTestServlet extends HttpServlet {
    private Pattern firstValidationPattern;
    private Pattern lastValidationPattern;
    private Pattern emailValidationPattern;
    private Pattern phoneValidationPattern;
    private Pattern birthdayValidationPattern;
    public FormTestServlet() {
        // --- Compile and set up all the regular expression patterns here ---
        firstValidationPattern = Pattern.compile("^[^0-9]{1,25}$");
        lastValidationPattern = Pattern.compile("^[^0-9]{1,25}$");
        emailValidationPattern = Pattern.compile("^[^0-9]{1,25}$");
        phoneValidationPattern = Pattern.compile("^(\\d{3})-(\\d{3})-(\\d{4})$");
        birthdayValidationPattern = Pattern.compile("^\\d{4}\\-\\d{2}\\-\\d{2}$");
    }
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // You can output in any format, text/JSON, text/HTML, etc. We'll keep it simple
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        // Print that this is a get, not a post
        out.println("Get");

        // Grab the data we got via a parameter
        String fieldname = request.getParameter("fieldname");

        // Just print the data out to confirm we got it.
        out.println("fieldname='"+fieldname+"'");

        // Now create matcher object.
        Matcher first = firstValidationPattern.matcher(fieldname);
        if (first.find( )) {
            out.println("success");
        } else {
            out.println("error");
            return;
        }

        // Now create matcher object.
        Matcher last = lastValidationPattern.matcher(fieldname);
        if (last.find( )) {
            out.println("success");
        } else {
            out.println("error");
            return;
        }

        // Now create matcher object.
        Matcher email = emailValidationPattern.matcher(fieldname);
        if (email.find( )) {
            out.println("success");
        } else {
            out.println("error");
            return;
        }

        // Now create matcher object.
        Matcher phone = phoneValidationPattern.matcher(fieldname);
        if (phone.find( )) {
            out.println("success");
        } else {
            out.println("error");
            return;
        }

        // Now create matcher object.
        Matcher birthday = birthdayValidationPattern.matcher(fieldname);
        if (birthday.find( )) {
            out.println("success");
        } else {
            out.println("error");
        }
    }

    @Override
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
    }
}