// https://developer.mozilla.org/en-US/docs/Web/API/IDBRequest/success_event
// https://developer.mozilla.org/en-US/docs/Web/API/IDBTransaction/db
const dbConnection = window.indexedDB.open('db_personal', 2);                                   // version 1
let db;
//on success = El successevent se dispara cuando un IDBRequesttiene éxito.
dbConnection.onsuccess = () => {
    db = dbConnection.result;
    console.log("Base de datos abierta", db);
}
// El upgradeneededevento se activa cuando se intentó abrir una base de datos 
// con un número de versión superior a su versión actual.
dbConnection.onupgradeneeded = (e) => {
    db = e.target.result;//elemento que nos devuelve
    console.log("Crear objetos de DB", db);
    const coleccionObjetos = db.createObjectStore('persona', {
        keyPath: 'IdPersona'
    });
}
// El errorevento se activa IDBTransactioncuando una solicitud devuelve un error 
// y el evento aparece en el objeto de la transacción.
dbConnection.onerror = (error) =>{
    console.log(error);
}
// https://developer.mozilla.org/es/docs/Web/API/IDBObjectStore/add
// https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/get
// https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/delete
// https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/put
//metodo INSERTAR
// const insertar = (informacion) =>{
//     // recuperando los datos de los inputs
//     var _idPersona = document.getElementById('IdPersona').value;
//     var _nombre = document.getElementById('Nombre').value;
//     console.log(_idPersona);
//     console.log(_nombre);

//     // creando un objeto articulo 
//     var art = {clave: _idPersona, nombre: _nombre};
//     var transaccion = db.transaction("persona", "readwrite");
//     const objeto = transaccion.objectStore('persona');
//     // insertar en el objeto
//     // const cargarInfo= objeto.add(informacion);
//     const cargarInfo= objeto.add(art);
//     console.log("cargar informacion",cargarInfo);
// }
// //metodo ELIMINAR
// const eliminar = (clave) =>{
//     var transaccion = db.transaction("persona", "readwrite");
//     const objeto = transaccion.objectStore('persona');
//     // insertar en el objeto
//     const eliminado = objeto.delete(clave);
//     eliminado.onsuccess = () => {
//         devolver();
//     }
//     eliminado.onerror = (error) => {
//         console.log(error);
//     }
    
// }
// //metodo Aactualizar
// const actualizar = (informacion) =>{
//     var transaccion = db.transaction("persona", "readwrite");
//     const objeto = transaccion.objectStore('persona');
//     // insertar en el objeto
//     const actualizarInfo= objeto.put(informacion);
//     if (actualizarInfo)
//         console.log("Se agrego con exito", actualizarInfo );
// }
// //metodo devolver
// const devolver = ()=>{
//     // Lista de boostrapp visualizar
//     var lista = document.getElementById("mostrarLista");
//     console.log(lista);
//     db = dbConnection.result;
//     // lectura de tablas
//     var transaccion = db.transaction("persona", "readonly");
//     const objeto = transaccion.objectStore('persona');
//     console.log(objeto);
//     // iterar los elementos
//     const cursor = objeto.openCursor();
//     cursor.onsuccess = (e) =>{
//         const c = e.target.result;
//         if (c){
//             // insertando en el html de UL, se realizo algunas concatenaciones adicionales
//             lista.innerHTML += "<li class='list-group-item'>"+c.value['clave']+'--'+c.value['nombre']+"</li>"
//             c.continue();
//         } else {
//             console.log("no tiene datos");
//         }
//     }
// }