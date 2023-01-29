//Clara Tschamon
package com.example.zeichencounter;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.IOException;

@WebServlet(value = "/ZeichenCounterServlet")
public class ZeichenCounterServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String inputValue = request.getParameter("inputValue");
        System.out.println(inputValue);

        // Berechne die Länge der Zeichenfolge
        int length = inputValue.length();


        /*
        // Erstelle einen XML-Datensatz mit dem Ergebnis
        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document doc = builder.newDocument();

            Element rootElement = doc.createElement("result");
            doc.appendChild(rootElement);

            Element lengthElement = doc.createElement("number");
            lengthElement.appendChild(doc.createTextNode(Integer.toString(length)));
            rootElement.appendChild(lengthElement);

            // Sende die Antwort zurück an den Client
            response.setContentType("application/xml");
            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();
            DOMSource source = new DOMSource(doc);
            StreamResult result = new StreamResult(response.getOutputStream());
            transformer.transform(source, result);
        } catch (ParserConfigurationException | TransformerException e) {
            e.printStackTrace();
        }
        */

        //einfachere Lösung
        response.getWriter().print(length);
    }
}
