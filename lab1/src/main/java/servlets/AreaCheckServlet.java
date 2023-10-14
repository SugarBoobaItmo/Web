package servlets;

import java.io.IOException;
import java.text.SimpleDateFormat;
import com.google.gson.Gson;
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
        if (request.getParameter("x") != null && request.getParameter("y") != null
                && request.getParameter("r") != null) {
            try {
                checkPoint(request, response);
            } catch (NumberFormatException e) {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid input parameters");
            }
        } else if (request.getParameter("r") != null) {
            try {
                reCheckPoints(request, response);
            } catch (NumberFormatException e) {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid input parameters");
            }
        }
    }

    private void checkPoint(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        double x = Double.parseDouble(request.getParameter("x"));
        double y = Double.parseDouble(request.getParameter("y"));
        double r = Double.parseDouble(request.getParameter("r"));

        // System.out.println("x: " + x + " y: " + y + " r: " + r);
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

            Point point = new Point(x, y, r, check, new SimpleDateFormat("HH:mm:ss").format(new Date()),
                    System.nanoTime() - start);
            model.addPoint(point);
            request.setAttribute("model", model);

            response.getWriter().write(new Gson().toJson(model.getPoints()));
        } else {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid input parameters");
        }
    }

    protected void reCheckPoints(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        double r = Double.parseDouble(request.getParameter("r"));

        HttpSession session = request.getSession();
        Model model = (Model) session.getAttribute("model");
        if (model == null) {
            model = new Model();
            model.setPoints(new ArrayList<Point>());
            session.setAttribute("model", model);
        }

        long start = System.nanoTime();
        for (Point point : model.getPoints()) {
            point.setCheck(AreaValidator.checkArea(point.getX(), point.getY(), r));
            point.setTime(new SimpleDateFormat("HH:mm:ss").format(new Date()));
            point.setExec_time(System.nanoTime() - start);
        }
        request.setAttribute("model", model);
        response.getWriter().write(new Gson().toJson(model.getPoints()));

    }
}
