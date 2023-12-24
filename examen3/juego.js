


// Crear/abrir la base de datos IndexedDB
var request = indexedDB.open("preguntasDB", 1);
var db;

request.onupgradeneeded = function(event) {
    db = event.target.result;
    var objectStore = db.createObjectStore("preguntas", { keyPath: "id" });
    objectStore.createIndex("enunciado", "enunciado", { unique: false });
    objectStore.createIndex("respuestaCorrecta", "respuestaCorrecta", { unique: false });

    // Agregar las preguntas a la base de datos
    var preguntas = [
        { id: 1, enunciado: "¿Cuál es el pecado capital de la pereza?", respuestaCorrecta: "La acedía" },
        { id: 2, enunciado: "¿Cuál es el pecado capital de la gula?", respuestaCorrecta: "La gula" },
        { id: 3, enunciado: "¿Cuál es el pecado capital de la ira?", respuestaCorrecta: "La ira" },
        { id: 4, enunciado: "¿Cuál es el pecado capital de la envidia?", respuestaCorrecta: "La envidia" },
        { id: 5, enunciado: "¿Cuál es el pecado capital de la soberbia?", respuestaCorrecta: "La soberbia" },
        { id: 6, enunciado: "¿Cuál es el pecado capital de la avaricia?", respuestaCorrecta: "La avaricia" },
        { id: 7, enunciado: "¿Cuál es el pecado capital de la lujuria?", respuestaCorrecta: "La lujuria" }
    ];

    for (var i = 0; i < preguntas.length; i++) {
        objectStore.add(preguntas[i]);
    }
};

request.onsuccess = function(event) {
    db = event.target.result;
    mostrarPreguntaAleatoria();
};

function mostrarPreguntaAleatoria() {
    var transaction = db.transaction("preguntas", "readonly");
    var objectStore = transaction.objectStore("preguntas");
    var request = objectStore.getAll();

    request.onsuccess = function(event) {
        var preguntas = event.target.result;
        var randomIndex = Math.floor(Math.random() * preguntas.length);
        var pregunta = preguntas[randomIndex];

        var questionContainer = document.getElementById("question-container");
        questionContainer.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Pregunta:</h5>
                    <p class="card-text">${pregunta.enunciado}</p>
                    <input type="text" id="respuesta" class="form-control" placeholder="Escribe tu respuesta here">
                    <br>
                    <button class="btn btn-primary" onclick="verificarRespuesta('${pregunta.respuestaCorrecta}')">Verificar</button>
                </div>
            </div>
        `;
    };
}

function verificarRespuesta(respuestaCorrecta) {
    var respuestaInput = document.getElementById("respuesta").value;

    if (respuestaInput.toLowerCase() === respuestaCorrecta.toLowerCase()) {
        alert("¡Respuesta correcta!");
    } else {
        alert("Respuesta incorrecta. Inténtalo de nuevo.");
    }

    mostrarPreguntaAleatoria();
}

