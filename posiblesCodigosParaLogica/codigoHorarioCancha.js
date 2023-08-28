// Función para asignar parejas aleatoriamente a zonas
function asignarParejasAZonas(parejas, zonas) {
    const parejasAleatorias = parejas.slice(); // Copia la lista de parejas
    const zonasAsignadas = [];

    // Función para ordenar zonas alfabéticamente
    function ordenarZonasPorNombre(a, b) {
        return a.zona.localeCompare(b.zona);
    }

    for (let i = 0; i < zonas; i++) {
        const zona = { zona: String.fromCharCode(65 + i), parejas: [] };
        for (let j = 0; j < 3; j++) {
            if (parejasAleatorias.length === 0) {
                break;
            }
            const parejaIndex = Math.floor(Math.random() * parejasAleatorias.length);
            const pareja = parejasAleatorias.splice(parejaIndex, 1)[0];
            zona.parejas.push(pareja);
        }
        zonasAsignadas.push(zona);
    }

    // Ordenar zonas alfabéticamente
    zonasAsignadas.sort(ordenarZonasPorNombre);

    return zonasAsignadas;
}

// Función para generar zonas para todas las categorías
function generarZonasPorCategorias(categorias, parejasPorCategoria) {
    const zonasPorCategorias = {};

    categorias.forEach((categoria, index) => {
        const parejas = Array.from({ length: parejasPorCategoria[index] }, (_, i) => `Pareja ${i + 1}`);
        const zonasAsignadas = asignarParejasAZonas(parejas, 9); // Cambiar la cantidad de zonas según tus necesidades
        zonasPorCategorias[categoria] = zonasAsignadas;
    });

    return zonasPorCategorias;
}

// Función para generar enfrentamientos con canchas y horarios únicos
function generarEnfrentamientosConCanchasYHorarios(zona, clubes, horas, duracionEnfrentamiento) {
    const parejas = zona.parejas;
    const enfrentamientos = [];
    let horarioBase = horas[0];

    for (let i = 0; i < parejas.length; i++) {
        const clubIndex = Math.floor(Math.random() * clubes.length); // Definir clubIndex aquí

        for (let j = i + 1; j < parejas.length; j++) {
            const enfrentamiento = `${parejas[i]} vs ${parejas[j]}`;
            const clubHorario = asignarClubYHorario(enfrentamientos, clubes, clubIndex, horas, horarioBase, duracionEnfrentamiento);

            if (clubHorario) {
                enfrentamientos.push({ enfrentamiento, club: clubHorario.club, horario: clubHorario.horario });
                horarioBase = (clubHorario.horario + duracionEnfrentamiento) % 24; // Asegura una separación de acuerdo a la duración
            }
        }
        horarioBase = (horarioBase + duracionEnfrentamiento) % 24; // Incrementa el horario base para el próximo día
    }

    return enfrentamientos;
}

// Función para asignar club y horario únicos sin superposiciones
function asignarClubYHorario(enfrentamientos, clubes, clubIndex, horas, horarioBase, duracionEnfrentamiento) {
    const disponibles = [];

    for (const horario of horas) {
        let superposicion = false;

        // Verifica si hay superposiciones con enfrentamientos del mismo club
        for (const enfrentamiento of enfrentamientos) {
            if (enfrentamiento.club === clubes[clubIndex].nombre) {
                const horaFinEnfrentamiento = (enfrentamiento.horario + duracionEnfrentamiento) % 24;
                if ((horario >= enfrentamiento.horario && horario < horaFinEnfrentamiento) ||
                    (horario < enfrentamiento.horario && (horario + duracionEnfrentamiento) > enfrentamiento.horario)) {
                    superposicion = true;
                    break;
                }
            }
        }

        const separacionMinimaCumplida = (horario - horarioBase + 24) % 24 >= duracionEnfrentamiento;

        if (!superposicion && separacionMinimaCumplida) {
            disponibles.push({ horario });
        }
    }

    if (disponibles.length === 0) {
        return null; // Si no hay horarios disponibles, retorna null
    }

    const clubNombre = clubes[clubIndex].nombre;

    return { club: clubNombre, horario: disponibles[Math.floor(Math.random() * disponibles.length)].horario };
}



const categorias = ["libre", "tercera", "cuarta", "quinta", "sexta", "septima"];
const parejasPorCategoria = [12, 15, 18, 27, 24, 21];
const zonasPorCategorias = generarZonasPorCategorias(categorias, parejasPorCategoria);

const clubes = [
    { nombre: "Nivel Padel", canchas: Array.from({ length: 11 }, (_, i) => `Cancha ${i + 1}`) },
    { nombre: "Los Troncos", canchas: Array.from({ length: 6 }, (_, i) => `Cancha ${i + 1}`) },
    { nombre: "Arena Garden", canchas: Array.from({ length: 5 }, (_, i) => `Cancha ${i + 1}`) }
];

const horasViernes = Array.from({ length: 9 }, (_, i) => 15 + i); // 15, 16, ..., 23
const horasSabado = Array.from({ length: 6 }, (_, i) => 9 + i); // 9, 10, ..., 14

const duracionEnfrentamiento = 1.5; // Duración estimada de 1.5 horas por enfrentamiento
// ...

for (const categoria of categorias) {
    console.log(`Categoria ${categoria}`);
    const zonas = zonasPorCategorias[categoria];

    zonas.forEach((zona) => {
        console.log(`Zona ${zona.zona}`);
        const enfrentamientos = generarEnfrentamientosConCanchasYHorarios(zona, clubes, horasViernes.concat(horasSabado), duracionEnfrentamiento);

        // Ordenar los enfrentamientos primero por día (viernes antes que sábado) y luego por horario
        enfrentamientos.sort((a, b) => {
            if (a.horario >= 15 && a.horario < 24 && b.horario >= 15 && b.horario < 24) {
                return a.horario - b.horario;
            }
            if (a.horario >= 15 && a.horario < 24) {
                return -1;
            }
            if (b.horario >= 15 && b.horario < 24) {
                return 1;
            }
            return a.horario - b.horario;
        });

        enfrentamientos.forEach((enfrentamiento) => {
            const dia = enfrentamiento.horario >= 15 && enfrentamiento.horario < 24 ? 'viernes' : 'sábado';
            const horaInicio = enfrentamiento.horario;
            const horaFin = (horaInicio + 1.5) % 24;
            const horaInicioFraccion = horaInicio - Math.floor(horaInicio) === 0.5 ? `${Math.floor(horaInicio)}:30` : `${Math.floor(horaInicio)}:00`;
            console.log(`    ${enfrentamiento.enfrentamiento} - ${enfrentamiento.club} - ${horaInicioFraccion} - ${dia}`);
        });
    });

    console.log('\n');
}
