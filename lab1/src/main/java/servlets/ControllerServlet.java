package servlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

// ControllerServlet, определяющий тип запроса, и, в зависимости от того, содержит ли запрос информацию о координатах точки и радиусе, делегирующий его обработку одному из перечисленных ниже компонентов. Все запросы внутри приложения должны передаваться этому сервлету (по методу GET или POST в зависимости от варианта задания), остальные сервлеты с веб-страниц напрямую вызываться не должны.

public class ControllerServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        System.out.println("ControllerServlet: doGet");
        if (request.getParameter("x") != null && request.getParameter("y") != null
                && request.getParameter("r") != null) {
            try {
                request.getRequestDispatcher("areaCheck").forward(request, response);
            } catch (NumberFormatException e) {
                PrintWriter out = response.getWriter();
                out.println("Incorrect input");

            }
        } else {
            request.getRequestDispatcher("../../../../web/index.jsp").forward(request, response);
            // response.sendRedirect("index.jsp");
        }

    }

}
