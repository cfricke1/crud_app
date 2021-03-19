package edu.simpson.cis320.crud_app;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.imageio.ImageIO;
import javax.servlet.ServletContext;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

@WebServlet(name = "memeServlet", value = "/meme")
public class MemeServlet extends HttpServlet {
    private final static Logger log = Logger.getLogger(MemeServlet.class.getName());

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        log.log(Level.INFO, "Meme servlet");

        ServletContext context = getServletContext();
        InputStream imageStream = context.getResourceAsStream("WEB-INF/classes/Meme.jpg");
        BufferedImage image = ImageIO.read(imageStream);

        // Modify Image
        // Get Graphics
        Graphics g = image.getGraphics();

        // Set Font
        String fontName = "Century Schoolbook";
        int fontSize = 90;
        int fontStyle = Font.BOLD;
        Font font = new Font(fontName, fontStyle, fontSize);
        g.setFont(font);

        String message = request.getParameter("message");
        if (message == null) {
            message = "Why you have to be mad";
        }

        Color myColor = new Color(0,255,0);
        g.setColor(myColor);

        g.drawString(message, 100, 100);

        g.dispose();

        // Write out image
        response.setContentType("image/jpg");
        OutputStream out = response.getOutputStream();
        ImageIO.write(image, "JPG", out);
    }

}