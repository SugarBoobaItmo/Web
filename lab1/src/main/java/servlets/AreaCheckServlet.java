package servlets;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import model.Model;
import model.Point;
import utils.AreaValidator;
import utils.CoordinatesValidator;

public class AreaCheckServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        double x = Double.parseDouble(request.getParameter("x"));
        double y = Double.parseDouble(request.getParameter("y"));
        double r = Double.parseDouble(request.getParameter("r"));

        HttpSession session = request.getSession();
        Model model = (Model) session.getAttribute("model");
        if (model == null) {
            model = new Model();
            model.setPoints(new ArrayList<Point>());
            session.setAttribute("model", model);
        }

        long start = System.nanoTime();
            
        boolean valid = CoordinatesValidator.validate(x, y, r);
        if (valid) {
            // check if the point is in the area
            boolean check = AreaValidator.checkArea(x, y, r);
           
            Point point = new Point(x, y, r, check, new SimpleDateFormat("HH:mm:ss").format(new Date()), System.nanoTime() - start);
            model.addPoint(point);
            request.setAttribute("model", model);

            response.sendRedirect("results.jsp");
        } else {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid input parameters");
        }
    }
}

