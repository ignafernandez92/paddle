const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const horarios = ["16pm-17pm", "17pm-18pm", "18pm-19pm", "19pm-20pm", "20pm-21pm"];
const dias_juego = ["Viernes", "Sabado"];
const canchas = ["Cancha 1", "Cancha 2", "Cancha 3"];

let parejas = [];
let zona_a = [], zona_b = [], zona_c = [], zona_d = [];

function getNextAvailableTime(zona) {
  // ...
}

function getNextAvailableCancha(zona) {
  // ...
}

function addPartido(zona, pareja1, pareja2) {
  // ...
}

function printZona(zona, zona_nombre) {
  console.log(`\n${zona_nombre}`);
  zona.forEach((partido, index) => {
    const dia = dias_juego[Math.floor(index / horarios.length)];
    const horario = horarios[index % horarios.length];
    const cancha = canchas[index % canchas.length];
    console.log(`${partido.parejas} = ${dia} ${horario} - ${cancha} - Club Hidden`);
  });
}

function startTorneo() {
  rl.question('Bienvenido al torneo de pádel. Ingresa el nombre de las parejas separadas por comas: ', (inputParejas) => {
    parejas = inputParejas.split(',').map(pareja => pareja.trim());

    // Creamos los partidos para cada zona
    addPartido(zona_a, parejas[0], parejas[1]);
    addPartido(zona_a, parejas[0], parejas[2]);
    addPartido(zona_a, parejas[2], parejas[3]);

    addPartido(zona_b, parejas[4], parejas[5]);
    addPartido(zona_b, parejas[5], parejas[6]);
    addPartido(zona_b, parejas[6], parejas[4]);

    addPartido(zona_c, parejas[7], parejas[8]);
    addPartido(zona_c, parejas[8], parejas[9]);
    addPartido(zona_c, parejas[7], parejas[9]);

    addPartido(zona_d, parejas[10], parejas[11]);
    addPartido(zona_d, parejas[11], parejas[12]);
    addPartido(zona_d, parejas[12], parejas[10]);

    // Imprimimos los resultados
    printZona(zona_a, "Zona A");
    printZona(zona_b, "Zona B");
    printZona(zona_c, "Zona C");
    printZona(zona_d, "Zona D");

    rl.question('¿Deseas ver otra vez el torneo? (Sí/No): ', (respuesta) => {
      if (respuesta.toLowerCase() === 'si') {
        // Limpiamos las zonas para una nueva inscripción
        zona_a = [];
        zona_b = [];
        zona_c = [];
        zona_d = [];
        startTorneo();
      } else {
        rl.close();
      }
    });
  });
}

startTorneo();

  
  
//Resultado posible

/*Fase de Grupos - Categoría Séptima
Grupo 1
Pareja 1: Pareja 12 - Horario: V 16:00-17:30, Cancha: 3
Pareja 2: Pareja 6 - Horario: V 17:00-18:30, Cancha: 11
Pareja 3: Pareja 3 - Horario: V 16:30-18:00, Cancha: 6
---
Grupo 2
Pareja 1: Pareja 2 - Horario: V 16:00-17:30, Cancha: 9
Pareja 2: Pareja 20 - Horario: V 17:00-18:30, Cancha: 1
Pareja 3: Pareja 14 - Horario: V 16:30-18:00, Cancha: 7
---
Grupo 3
Pareja 1: Pareja 19 - Horario: V 16:00-17:30, Cancha: 4
Pareja 2: Pareja 15 - Horario: V 17:00-18:30, Cancha: 5
Pareja 3: Pareja 10 - Horario: V 16:30-18:00, Cancha: 2
---
Grupo 4
Pareja 1: Pareja 13 - Horario: V 16:00-17:30, Cancha: 8
Pareja 2: Pareja 11 - Horario: V 17:00-18:30, Cancha: 10
Pareja 3: Pareja 1 - Horario: V 16:30-18:00, Cancha: 5
---

Fase de Grupos - Categoría Sexta
Grupo 1
Pareja 1: Pareja 11 - Horario: V 16:00-17:30, Cancha: 2
Pareja 2: Pareja 17 - Horario: V 17:00-18:30, Cancha: 7
Pareja 3: Pareja 14 - Horario: V 16:30-18:00, Cancha: 5
---
Grupo 2
Pareja 1: Pareja 4 - Horario: V 16:00-17:30, Cancha: 3
Pareja 2: Pareja 15 - Horario: V 17:00-18:30, Cancha: 6
Pareja 3: Pareja 13 - Horario: V 16:30-18:00, Cancha: 1
---
Grupo 3
Pareja 1: Pareja 20 - Horario: V 16:00-17:30, Cancha: 1
Pareja 2: Pareja 5 - Horario: V 17:00-18:30, Cancha: 10
Pareja 3: Pareja 8 - Horario: V 16:30-18:00, Cancha: 9
---
Grupo 4
Pareja 1: Pareja 10 - Horario: V 16:00-17:30, Cancha: 6
Pareja 2: Pareja 18 - Horario: V 17:00-18:30, Cancha: 3
Pareja 3: Pareja 9 - Horario: V 16:30-18:00, Cancha: 2
---

Fase de Grupos - Categoría Quinta
Grupo 1
Pareja 1: Pareja 16 - Horario: V 16:00-17:30, Cancha: 1
Pareja 2: Pareja 8 - Horario: V 17:00-18:30, Cancha: 4
Pareja 3: Pareja 9 - Horario: V 16:30-18:00, Cancha: 2
---
Grupo 2
Pareja 1: Pareja 1 - Horario: V 16:00-17:30, Cancha: 5
Pareja 2: Pareja 11 - Horario: V 17:00-18:30, Cancha: 7
Pareja 3: Pareja 12 - Horario: V 16:30-18:00, Cancha: 6
---
Grupo 3
Pareja 1: Pareja 3 - Horario: V 16:00-17:30, Cancha: 9
Pareja 2: Pareja 7 - Horario: V 17:00-18:30, Cancha: 3
Pareja 3: Pareja 10 - Horario: V 16:30-18:00, Cancha: 11
---
Grupo 4
Pareja 1: Pareja 2 - Horario: V 16:00-17:30, Cancha: 2
Pareja 2: Pareja 5 - Horario: V 17:00-18:30, Cancha: 10
Pareja 3: Pareja 4 - Horario: V 16:30-18:00, Cancha: 8
---

... (Resultados de las demás categorías)


se siguen repitiendo las parejas 1, 2 y 3 en cada zona de cada categoria. Te muestro los resultados:

Categoría Séptima
Zona A
Pareja 1: Pareja 13 - Horario: 12:00-13.5:30, Cancha: 9
Pareja 2: Pareja 6 - Horario: 21:00-22.5:30, Cancha: 5
Pareja 3: Pareja 24 - Horario: 12:00-13.5:30, Cancha: 6
---
Zona B
Pareja 1: Pareja 19 - Horario: 17:00-18.5:30, Cancha: 6
Pareja 2: Pareja 21 - Horario: 17:00-18.5:30, Cancha: 8
Pareja 3: Pareja 10 - Horario: 17:00-18.5:30, Cancha: 5
---
Zona C
Pareja 1: Pareja 3 - Horario: 18:00-19.5:30, Cancha: 4
Pareja 2: Pareja 17 - Horario: 12:00-13.5:30, Cancha: 10
Pareja 3: Pareja 1 - Horario: 12:00-13.5:30, Cancha: 8
---
Zona D
Pareja 1: Pareja 2 - Horario: 20:00-21.5:30, Cancha: 11
Pareja 2: Pareja 12 - Horario: 20:00-21.5:30, Cancha: 10
Pareja 3: Pareja 15 - Horario: 13:00-14.5:30, Cancha: 9
---
Zona E
Pareja 1: Pareja 8 - Horario: 18:00-19.5:30, Cancha: 5
Pareja 2: Pareja 11 - Horario: 17:00-18.5:30, Cancha: 3
Pareja 3: Pareja 4 - Horario: 18:00-19.5:30, Cancha: 9
---
Zona F
Pareja 1: Pareja 18 - Horario: 19:00-20.5:30, Cancha: 2
Pareja 2: Pareja 20 - Horario: 17:00-18.5:30, Cancha: 3
Pareja 3: Pareja 23 - Horario: 17:00-18.5:30, Cancha: 11
---
Zona G
Pareja 1: Pareja 5 - Horario: 14:00-15.5:30, Cancha: 7
Pareja 2: Pareja 9 - Horario: 20:00-21.5:30, Cancha: 10
Pareja 3: Pareja 22 - Horario: 14:00-15.5:30, Cancha: 4
---
Zona H
Pareja 1: Pareja 7 - Horario: 18:00-19.5:30, Cancha: 10
Pareja 2: Pareja 14 - Horario: 18:00-19.5:30, Cancha: 3
Pareja 3: Pareja 16 - Horario: 18:00-19.5:30, Cancha: 8*/
