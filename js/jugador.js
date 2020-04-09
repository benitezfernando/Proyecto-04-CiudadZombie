/* El objeto jugador es un objeto literal que se encuentra incompleto.
 Solo tiene asignadas algunas de sus propiedades y ningun metodo */
var Jugador = {
  /* el sprite contiene la ruta de la imagen
   */
  sprite: "imagenes/auto_rojo_abajo.png",
  x: 130,
  y: 160,
  ancho: 15,
  alto: 30,
  velocidad: 10,
  vidas: 5,
  // Hay que agregar lo que falte al jugador: movimientos, perdida de vidas,
  movimiento: function(direccion) {
    if (direccion == "izq") {
      this.x -= 10;
      this.sprite = "imagenes/auto_rojo_izquierda.png";
      this.ancho = 30;
      this.alto = 15;
    }
    if (direccion == "der") {
      this.x += 10;
      this.sprite = "imagenes/auto_rojo_derecha.png";
      this.ancho = 30;
      this.alto = 15;
    }
    if (direccion == "arriba") {
      this.y -= 10;
      this.sprite = "imagenes/auto_rojo_arriba.png";
      this.ancho = 15;
      this.alto = 30;
    }
    if (direccion == "abajo") {
      this.y += 10;
      this.sprite = "imagenes/auto_rojo_abajo.png";
      this.ancho = 15;
      this.alto = 30;
    }
  },
  perderVidas: function(cantVidas) {
    this.vidas -= cantVidas;
  }
  
};
