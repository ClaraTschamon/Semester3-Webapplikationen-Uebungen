//Clara Tschamon

function countCharacters(){
    // Lese den Wert des Eingabefeldes aus
    var inputValue = document.getElementById("inputField").value;

    // Erstelle ein neues XMLHttpRequest-Objekt
    var xhr = new XMLHttpRequest();

    // Öffne eine Verbindung zum Server
    xhr.open("POST", "ZeichenCounterServlet?inputValue=" + inputValue, true);

    // Setze den Content-Type der Anforderung
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Sende die Anforderung an den Server
    xhr.send()

    // Verarbeite die Antwort des Servers
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {

            /*
            // Lese die Länge der Zeichenfolge aus dem XML-Datensatz aus
            var responseXML = xhr.responseXML;
            var lengthNode = responseXML.getElementsByTagName("number")[0];
            var length = lengthNode.textContent;
            */

            //einfachere Lösung
            var length =  xhr.responseText

            // Aktualisiere das Ausgabefeld
            document.getElementById("outputField").innerHTML = length;
        }
    }
}