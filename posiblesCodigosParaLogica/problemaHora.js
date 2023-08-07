// Generar problemas horarios para todas las parejas en una categoría
function generarProblemasHorariosCategoria(numParejas) {
    const problemasHorarios = [];
    for (let i = 0; i < numParejas; i++) {
      problemasHorarios.push(generarProblemasHorarios());
    }
    return problemasHorarios;
  }
  
  // Función para generar horarios aleatorios dentro de un rango de tiempo
  function generarHorarioAleatorio(min, max) {
    const hora = Math.floor(Math.random() * (max - min + 1)) + min;
    return hora.toString().padStart(2, '0') + ':00';
  }
  
  // Función para asignar canchas a cada pareja en un grupo de la fase de grupos
  function asignarCanchasAGrupo(grupo, numCanchas) {
    // ... (El resto de la función sigue igual) ...
  }
  
  // Ejemplo de uso para una categoría específica (ejemplo: categoría séptima)
  const numParejasPorCategoria = 12;
  const numCanchas = 11; // 11 canchas disponibles en el club
  
  // Generar problemas horarios para las parejas de la categoría
  const problemasHorariosCategoria = generarProblemasHorariosCategoria(numParejasPorCategoria);
  
  // Generar las parejas con sus respectivos problemas horarios
  const parejasInscritas = [];
  for (let i = 1; i <= numParejasPorCategoria; i++) {
    parejasInscritas.push({ nombre: `Pareja ${i}`, problemaHorario: problemasHorariosCategoria[i - 1] });
  }
  
  // Realizar el sorteo aleatorio de las parejas para la fase de grupos
  const parejasSorteadas = shuffle([...parejasInscritas]);
  
  // Dividir las parejas sorteadas en grupos para la fase de grupos
  const gruposFaseGrupos = formarGrupos(parejasSorteadas);
  
  // Asignar horarios y canchas a cada grupo de la fase de grupos
  gruposFaseGrupos.forEach((grupo) => {
    const horariosViernes = generarHorariosFaseGrupos(8, 23, grupo.length);
    const horariosSabado = generarHorariosFaseGrupos(8, 19, grupo.length);
    grupo.forEach((pareja, index) => {
      pareja.horario = horariosViernes[index];
      pareja.cancha = -1; // Inicialmente se asignará una cancha aleatoria en función de las disponibles
    });
  
    // Asignar canchas a cada pareja en el grupo
    asignarCanchasAGrupo(grupo, numCanchas);
  });
  
  console.log('Grupos para la Fase de Grupos:', gruposFaseGrupos);
  



  // Grupos para la Fase de Grupos:
Categoría 1
Grupo 1, Pareja 1: Pareja 12 - Horario: V08:00, Cancha: 7
Grupo 1, Pareja 2: Pareja 10 - Horario: V09:00, Cancha: 2
Grupo 1, Pareja 3: Pareja 1 - Horario: V10:00, Cancha: 9

Grupo 2, Pareja 4: Pareja 9 - Horario: V08:00, Cancha: 11
Grupo 2, Pareja 5: Pareja 11 - Horario: V09:00, Cancha: 10
Grupo 2, Pareja 6: Pareja 2 - Horario: V10:00, Cancha: 4

Grupo 3, Pareja 7: Pareja 4 - Horario: V08:00, Cancha: 6
Grupo 3, Pareja 8: Pareja 7 - Horario: V09:00, Cancha: 1
Grupo 3, Pareja 9: Pareja 8 - Horario: V10:00, Cancha: 3

Grupo 4, Pareja 10: Pareja 6 - Horario: S08:00, Cancha: 8
Grupo 4, Pareja 11: Pareja 3 - Horario: S09:00, Cancha: 5
Grupo 4, Pareja 12: Pareja 5 - Horario: S10:00, Cancha: 11
---
