

var Juego = {

  anchoCanvas: 961,
  altoCanvas: 577,
  jugador: Jugador,
  vidasInicial: Jugador.vidas,

  ganador: false,

  obstaculosCarretera: [

    new Obstaculo("imagenes/valla_horizontal.png", 70, 430, 30, 30, 1),
    new Obstaculo("imagenes/bache.png", 150, 300, 30, 30, 1),
    new Obstaculo("imagenes/auto_verde_abajo.png", 790, 400, 15, 30, 1),
    new Obstaculo("imagenes/auto_verde_derecha.png", 450, 470, 30, 15, 1),
    new Obstaculo("imagenes/valla_horizontal.png", 790, 240, 30, 30, 1),
    new Obstaculo("imagenes/valla_horizontal.png", 760, 240, 30, 30, 1),
    new Obstaculo("imagenes/valla_horizontal.png", 850, 310, 30, 30, 1),
    new Obstaculo("imagenes/valla_vertical.png", 360, 235, 30, 30, 1)
  ],
 
  bordes: [
    // // Bordes
    new Obstaculo("", 0, 5, 961, 18, 0),
    new Obstaculo("", 0, 559, 961, 18, 0),
    new Obstaculo("", 0, 5, 18, 572, 0),
    new Obstaculo("", 943, 5, 18, 572, 0),
    // Veredas
    new Obstaculo("", 18, 23, 51, 536, 2),
    new Obstaculo("", 69, 507, 690, 52, 2),
    new Obstaculo("", 587, 147, 173, 360, 2),
    new Obstaculo("", 346, 147, 241, 52, 2),
    new Obstaculo("", 196, 267, 263, 112, 2),
    new Obstaculo("", 196, 23, 83, 244, 2),
    new Obstaculo("", 279, 23, 664, 56, 2),
    new Obstaculo("", 887, 79, 56, 480, 2)
  ],
  // Los enemigos se agregaran en este arreglo.
  enemigos: [
    new ZombieCaminante("imagenes/zombie1.png", 120, 320, 10, 10, 2, {
      desdeX: 0,
      hastaX: 961,
      desdeY: 0,
      hastaY: 577
    }),
    new ZombieCaminante("imagenes/zombie2.png", 150, 350, 10, 10, 2, {
      desdeX: 0,
      hastaX: 300,
      desdeY: 0,
      hastaY: 100
    }),
    new ZombieCaminante("imagenes/zombie3.png", 159, 359, 10, 10, 2, {
      desdeX: 0,
      hastaX: 961,
      desdeY: 0,
      hastaY: 577
    }),
    new ZombieCaminante("imagenes/zombie3.png", 329, 259, 10, 10, 2, {
      desdeX: 0,
      hastaX: 961,
      desdeY: 0,
      hastaY: 577
    }),
    new ZombieCaminante("imagenes/zombie2.png", 650, 250, 10, 10, 2, {
      desdeX: 0,
      hastaX: 300,
      desdeY: 0,
      hastaY: 100
    }),

    new ZombieConductor(
      "imagenes/tren_horizontal.png",
      398,
      325,
      90,
      30,
      5,
      { desdeX: 0, hastaX: 961, desdeY: 0, hastaY: 577 },
      "h"
    ),
    new ZombieConductor(
      "imagenes/tren_vertical.png",
      674,
      0,
      30,
      90,
      5,
      { desdeX: 0, hastaX: 961, desdeY: 0, hastaY: 577 },
      "v"
    ),
    new ZombieConductor(
      "imagenes/tren_vertical.png",
      644,
      100,
      30,
      90,
      5,
      { desdeX: 0, hastaX: 961, desdeY: 0, hastaY: 577 },
      "v"
    )
  ]
};

Juego.iniciarRecursos = function() {
  Resources.load([
    "imagenes/mapa.png",
    "imagenes/mensaje_gameover.png",
    "imagenes/Splash.png",
    "imagenes/bache.png",
    "imagenes/tren_horizontal.png",
    "imagenes/tren_vertical.png",
    "imagenes/valla_horizontal.png",
    "imagenes/valla_vertical.png",
    "imagenes/zombie1.png",
    "imagenes/zombie2.png",
    "imagenes/zombie3.png",
    "imagenes/zombie4.png",
    "imagenes/auto_rojo_abajo.png",
    "imagenes/auto_rojo_arriba.png",
    "imagenes/auto_rojo_derecha.png",
    "imagenes/auto_rojo_izquierda.png",
    "imagenes/auto_verde_abajo.png",
    "imagenes/auto_verde_derecha.png"
  ]);
  Resources.onReady(this.comenzar.bind(Juego));
};

// Agrega los bordes de las veredas a los obstaculos de la carretera
Juego.obstaculos = function() {
  return this.obstaculosCarretera.concat(this.bordes);
};

Juego.comenzar = function() {
  // Inicializar el canvas del juego
  Dibujante.inicializarCanvas(this.anchoCanvas, this.altoCanvas);

  this.buclePrincipal();
};

Juego.buclePrincipal = function() {
  // Con update se actualiza la logica del juego, tanto ataques como movimientos
  this.update();
  // Funcion que dibuja por cada fotograma a los objetos en pantalla.
  this.dibujar();
  
  window.requestAnimationFrame(this.buclePrincipal.bind(this));
};

Juego.update = function() {
  this.calcularAtaques();
  this.moverEnemigos();
};

Juego.capturarMovimiento = function(tecla) {
  var movX = 0;
  var movY = 0;
  var velocidad = this.jugador.velocidad;

  
  if (tecla == "izq") {
    movX = -velocidad;
  }
  if (tecla == "arriba") {
    movY = -velocidad;
  }
  if (tecla == "der") {
    movX = velocidad;
  }
  if (tecla == "abajo") {
    movY = velocidad;
  }

  
  if (this.chequearColisiones(movX + this.jugador.x, movY + this.jugador.y)) {
   
    if (tecla == "izq") {
      this.jugador.movimiento("izq");
    }
    if (tecla == "der") {
      this.jugador.movimiento("der");
    }
    if (tecla == "arriba") {
      this.jugador.movimiento("arriba");
    }
    if (tecla == "abajo") {
      this.jugador.movimiento("abajo");
    }
  }
};

Juego.dibujar = function() {
  // Borrar el fotograma actual
  Dibujante.borrarAreaDeJuego();
  //Se pinta la imagen de fondo segun el estado del juego
  this.dibujarFondo();

 

 
  if (Juego.terminoJuego() == false) {
    if (Juego.ganoJuego() == false) {
      Dibujante.dibujarEntidad(this.jugador);
    }
  }

  if (Juego.terminoJuego() == false) {
    if (Juego.ganoJuego() == false) {
      Dibujante.dibujarRectangulo("yellow", 759, 523.5, 128, 40);
    }
  }

  // Se recorren los obstaculos de la carretera pintandolos
  this.obstaculosCarretera.forEach(function(obstaculo) {
    if (Juego.terminoJuego() == false) {
      if (Juego.ganoJuego() == false) {
        Dibujante.dibujarEntidad(obstaculo);
      }
    }
  });

  //Se recorren los enemigos pintandolos
  this.enemigos.forEach(function(enemigo) {
    if (Juego.terminoJuego() == false) {
      if (Juego.ganoJuego() == false) {
        Dibujante.dibujarEntidad(enemigo);
      }
    }
  });

  // El dibujante dibuja las vidas del jugador
  var tamanio = this.anchoCanvas / this.vidasInicial;
  if (Juego.terminoJuego() == false) {
    if (Juego.ganoJuego() == false) {
      Dibujante.dibujarRectangulo("white", 0, 0, this.anchoCanvas, 8);
      for (var i = 0; i < this.jugador.vidas; i++) {
        var x = tamanio * i;
        Dibujante.dibujarRectangulo("red", x, 0, tamanio, 8);
      }
    }
  }
};


Juego.moverEnemigos = function() {
 
  this.enemigos.forEach(function(enemigo) {
    enemigo.mover();
  });
};


Juego.calcularAtaques = function() {
  this.enemigos.forEach(function(enemigo) {
    if (
      this.intersecan(enemigo, this.jugador, this.jugador.x, this.jugador.y)
    ) {
     
      enemigo.comenzarAtaque(this.jugador);
    } else {
      
      enemigo.dejarDeAtacar(this.jugador);
    }
  }, this);
};


Juego.chequearColisiones = function(x, y) {
  var puedeMoverse = true;
  this.obstaculos().forEach(function(obstaculo) {
    if (this.intersecan(obstaculo, this.jugador, x, y)) {
      
      obstaculo.chocar();

      puedeMoverse = false;
    }
  }, this);
  return puedeMoverse;
};


Juego.intersecan = function(elemento1, elemento2, x, y) {
  var izquierda1 = elemento1.x;
  var derecha1 = izquierda1 + elemento1.ancho;
  var techo1 = elemento1.y;
  var piso1 = techo1 + elemento1.alto;
  var izquierda2 = x;
  var derecha2 = izquierda2 + elemento2.ancho;
  var techo2 = y;
  var piso2 = y + elemento2.alto;

  return (
    piso1 >= techo2 &&
    techo1 <= piso2 &&
    derecha1 >= izquierda2 &&
    izquierda1 <= derecha2
  );
};

Juego.dibujarFondo = function() {
 
  if (this.terminoJuego()) {
    Dibujante.dibujarImagen(
      "imagenes/mensaje_gameover.png",
      0,
      5,
      this.anchoCanvas,
      this.altoCanvas
    );
    document.getElementById("reiniciar").style.visibility = "visible";
  }

  
  else if (this.ganoJuego()) {
    Dibujante.dibujarImagen("imagenes/Splash.png", 190, 113, 500, 203);
    document.getElementById("reiniciar").style.visibility = "visible";
  } else {
    Dibujante.dibujarImagen(
      "imagenes/mapa.png",
      0,
      5,
      this.anchoCanvas,
      this.altoCanvas
    );
  }
};

Juego.terminoJuego = function() {
  return this.jugador.vidas <= 0;
};


Juego.ganoJuego = function() {
  return this.jugador.y + this.jugador.alto > 530;
};

Juego.iniciarRecursos();


document.addEventListener("keydown", function(e) {
  var allowedKeys = {
    37: "izq",
    38: "arriba",
    39: "der",
    40: "abajo"
  };

  Juego.capturarMovimiento(allowedKeys[e.keyCode]);
});
