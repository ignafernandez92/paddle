// Función para asignar club y horario únicos sin superposiciones
function asignarClubYHorario(enfrentamientos, clubes, clubIndex, horas, horarioBase, duracionEnfrentamiento) {
    const disponibles = [];
    const clubNombre = clubes[clubIndex].nombre;

    for (const horario of horas) {
        let superposicion = false;

        for (const enfrentamiento of enfrentamientos) {
            if (enfrentamiento.club === clubNombre) {
                const horaFinEnfrentamiento = (enfrentamiento.horario + duracionEnfrentamiento) % 24;
                if ((horario >= enfrentamiento.horario && horario < horaFinEnfrentamiento) ||
                    (horario < enfrentamiento.horario && (horario + duracionEnfrentamiento) > enfrentamiento.horario)) {
                    superposicion = true;
                    break;
                }
            }
        }

        const horariosOcupados = horariosOcupadosPorClub[clubNombre];
        for (const ocupado of horariosOcupados) {
            const horaFinOcupado = (ocupado + duracionEnfrentamiento) % 24;
            if ((horario >= ocupado && horario < horaFinOcupado) ||
                (horario < ocupado && (horario + duracionEnfrentamiento) > ocupado)) {
                superposicion = true;
                break;
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

    // Actualiza los horarios ocupados del club actual
    horariosOcupadosPorClub[clubNombre].push(disponibles[0].horario);

    return { club: clubNombre, horario: disponibles[0].horario };
}


//ANDA PERFECTO EL SORTEO ALEATORIO MAS ENFRENTAMIENTOS