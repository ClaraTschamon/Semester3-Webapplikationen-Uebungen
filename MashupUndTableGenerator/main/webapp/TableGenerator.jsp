<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%--
  Created by IntelliJ IDEA.
  User: clara
  Date: 14.12.2022
  Time: 15:56
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
    <head>
        <title>Generate Table</title>
        <link href="table.css" rel="stylesheet" type="text/css">
    </head>
    <body>

    <table>
        <c:forEach begin="0" end="${sessionScope.numberRows}" varStatus="loop1">
            <tr>
                <c:forEach begin="0" end="${sessionScope.numberCols}" varStatus="loop2">
                    <c:choose>
                        <c:when test="${(loop1.index % 2 == 0) and (loop2.index % 2 == 0)}">
                            <td class="redtd">(${loop1.index}, ${loop2.index})</td>
                        </c:when>
                        <c:when test="${(loop1.index % 2 == 0) and (loop2.index % 2 != 0)}">
                            <td class="yellowtd">(${loop1.index}, ${loop2.index})</td>
                        </c:when>
                        <c:when test="${(loop1.index % 2 != 0) and (loop2.index % 2 != 0)}">
                            <td class="redtd">(${loop1.index}, ${loop2.index})</td>
                        </c:when>
                        <c:when test="${(loop1.index % 2 != 0) and (loop2.index % 2 == 0)}">
                            <td class="yellowtd">(${loop1.index}, ${loop2.index})</td>
                        </c:when>
                    </c:choose>
                </c:forEach>
            </tr>
        </c:forEach>
    </table>
    </body>
</html>
