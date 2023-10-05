package servlets;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import model.Model;
import model.Point;
// AreaCheckServlet, осуществляющий проверку попадания точки в область на координатной плоскости и формирующий HTML-страницу с результатами проверки. Должен обрабатывать все запросы, содержащие сведения о координатах точки и радиусе области.

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
            session.setAttribute("model", model);
        }

        long start = System.nanoTime();
        response.setContentType("text/html");
            
        if (validate(x, y, r)) {
            boolean check = checkArea(x, y, r);
            Point point = new Point(x, y, r, check, new SimpleDateFormat("HH:mm:ss").format(new Date()), System.nanoTime() - start);
            model.addPoint(point);
            request.setAttribute("model", model);
            // request.getRequestDispatcher("../../../webapp/results.jsp").forward(request, response);
            request.getRequestDispatcher("results.jsp").forward(request, response);
        } else {
            // request.getRequestDispatcher("../../../web/index.jsp").forward(request, response);
            response.sendRedirect("index.jsp");
        }
    }

    protected boolean checkArea(double x, double y, double r) {
        boolean check_sector = ((x * x + y * y) <= r * r && x >= 0 && y <= 0);
        boolean check_triangle = (y + x <= r && x >= 0 && y >= 0);
        boolean check_square = (x <= 0 && y <= 0 && x >= (-1) * r && y >= (-1) * r);
        boolean check_y = -5 <= y && y <= 5;
        return (check_sector || check_triangle || check_square) && check_y;

    }

    protected boolean validate(double x, double y, double r) {
        int max_len = 8;
        boolean check_len = String.valueOf(x).length() <= max_len && String.valueOf(y).length() <= max_len && String.valueOf(r).length() <= max_len;
        boolean check_num = Double.isFinite(x) && Double.isFinite(y) && Double.isFinite(r);
        boolean check_r = r > 0 && r <= 5;
        boolean check_x = x >= -4 && x <= 4;
        boolean check_y = y >= -5 && y <= 5;
        return check_len && check_num && check_r && check_x && check_y;
    }

}

