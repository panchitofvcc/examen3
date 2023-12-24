javascript
// Pide al usuario que ingrese su edad
let edad = prompt("Ingresa tu edad:");

// Comprueba si la edad es un número y si es mayor de 0
if (!isNaN(edad) && parseInt(edad) > 0) {
  // Si la edad es un número y mayor de 0, comprueba si es mayor o igual a 18
  if (parseInt(edad) >= 18) {
    console.log("¡Felicidades! Eres elegible para votar.");
  } else {
    console.log("Lo siento, eres menor de edad y no puedes votar.");
  }
} else {
  // Si no es un número o es menor o igual a 0, muestra un mensaje de error
  console.log("Error: Ingresa un número válido mayor de 0.");
}