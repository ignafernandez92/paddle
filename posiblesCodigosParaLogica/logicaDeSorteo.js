const parejasInscritas = [
    { nombre: 'Pareja 1' },
    { nombre: 'Pareja 2' },
    { nombre: 'Pareja 3' },
    { nombre: 'Pareja 4' },
    { nombre: 'Pareja 5' },
    { nombre: 'Pareja 6' },
    { nombre: 'Pareja 7' },
    { nombre: 'Pareja 8' },
    { nombre: 'Pareja 9' },
    { nombre: 'Pareja 10' },
    { nombre: 'Pareja 11' },
    { nombre: 'Pareja 12' },
  ];

  function shuffle(array) {
    // Implementación del algoritmo de Fisher-Yates para mezclar un array
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  function sortearParejas(parejasInscritas) {
    // Realizar el sorteo aleatorio de parejas
    const parejasSorteadas = shuffle([...parejasInscritas]);
  
    return parejasSorteadas;
  }
  
  const parejasSorteadas = sortearParejas(parejasInscritas);
  console.log('Parejas Sorteadas:', parejasSorteadas);

  //posible resultado, Siempre va a variar

 parejasSorteadas: [
    { nombre: 'Pareja 8' },
    { nombre: 'Pareja 1' },
    { nombre: 'Pareja 3' },
    { nombre: 'Pareja 6' },
    { nombre: 'Pareja 4' },
    { nombre: 'Pareja 9' },
    { nombre: 'Pareja 2' },
    { nombre: 'Pareja 10' },
    { nombre: 'Pareja 11' },
    { nombre: 'Pareja 5' },
    { nombre: 'Pareja 12' },
    { nombre: 'Pareja 7' }
  ]

  //Ahora dividimos el array en grupos mas pequnos con la siguiente funcion

  function formarGrupos(parejasSorteadas) {
    const grupos = [];
    for (let i = 0; i < parejasSorteadas.length; i += 3) {
      const grupo = parejasSorteadas.slice(i, i + 3);
      grupos.push(grupo);
    }
    return grupos;
  }
  
  const gruposFaseGrupos = formarGrupos(parejasSorteadas);
  console.log('Grupos para la Fase de Grupos:', gruposFaseGrupos);

  //EL resultado es el siguiente

  gruposFaseGrupos: [
    [
      { nombre: 'Pareja 8' },
      { nombre: 'Pareja 1' },
      { nombre: 'Pareja 3' }
    ],
    [    { nombre: 'Pareja 6' },    { nombre: 'Pareja 4' },    { nombre: 'Pareja 9' }  ],
    [    { nombre: 'Pareja 2' },    { nombre: 'Pareja 10' },    { nombre: 'Pareja 11' }  ],
    [    { nombre: 'Pareja 5' },    { nombre: 'Pareja 12' },    { nombre: 'Pareja 7' }  ]
  ]
  