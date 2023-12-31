function asignarParejasAZonas(parejas) {
    const parejasAleatorias = parejas.slice();
    const zonasAsignadas = [];

    function ordenarZonasPorNombre(a, b) {
        return a.zona.localeCompare(b.zona);
    }

    while (parejasAleatorias.length > 0) {
        const zona = { zona: String.fromCharCode(65 + zonasAsignadas.length), parejas: [] };
        
        for (let i = 0; i < 3; i++) {
            if (parejasAleatorias.length === 0) {
                break;
            }
            const parejaIndex = Math.floor(Math.random() * parejasAleatorias.length);
            const pareja = parejasAleatorias.splice(parejaIndex, 1)[0];
            zona.parejas.push(pareja);
        }

        zonasAsignadas.push(zona);
    }

    zonasAsignadas.forEach((zona) => {
        console.log(`Zona ${zona.zona}`);
        for (let i = 0; i < zona.parejas.length; i++) {
            for (let j = i + 1; j < zona.parejas.length; j++) {
                console.log(`    Pareja ${zona.parejas[i]} vs Pareja ${zona.parejas[j]}`);
            }
        }
        console.log('\n');
    });

    zonasAsignadas.sort(ordenarZonasPorNombre);

    return zonasAsignadas;
}

// Ejemplo de uso
const parejasPorTorneo = 12; // Cambiar la cantidad de parejas según tus necesidades
const parejas = Array.from({ length: parejasPorTorneo }, (_, i) => `Pareja ${i + 1}`);
asignarParejasAZonas(parejas);