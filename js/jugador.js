
var Jugador = {
  
  sprite: "imagenes/auto_rojo_abajo.png",
  x: 130,
  y: 160,
  ancho: 15,
  alto: 30,
  velocidad: 10,
  vidas: 5,
  
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
