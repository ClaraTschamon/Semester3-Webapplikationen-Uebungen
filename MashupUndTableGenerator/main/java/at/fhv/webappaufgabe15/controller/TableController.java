package at.fhv.webappaufgabe15.controller;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet(urlPatterns = {"/TableController"})
public class TableController extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ServletContext application = getServletContext();
        String dispatchto = "";

        if (request.getParameter("dispatchto") != null) {
            dispatchto = request.getParameter("dispatchto");
        }

        if(dispatchto.equals("TableInput")){
            int numberRows = Integer.parseInt(request.getParameter("AnzahlZeilen")) - 1;
            int numberCols = Integer.parseInt(request.getParameter("AnzahlSpalten")) - 1;
            request.getSession().setAttribute("numberRows", numberRows);
            request.getSession().setAttribute("numberCols", numberCols);

            String page = "/TableGenerator.jsp";
            RequestDispatcher dispatcher = application.getRequestDispatcher(page);
            dispatcher.forward(request, response);
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
}
