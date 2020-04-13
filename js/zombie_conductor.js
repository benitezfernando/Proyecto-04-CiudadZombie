

var ZombieConductor = function(
  sprite,
  x,
  y,
  ancho,
  alto,
  velocidad,
  rangoMov,
  direccion
) {
  
  this.direccion = direccion;
  Enemigo.call(this, sprite, x, y, ancho, alto, velocidad, rangoMov);
  
};


ZombieConductor.prototype = Object.create(Enemigo.prototype);
ZombieConductor.prototype.constructor = ZombieConductor;


ZombieConductor.prototype.mover = function() {
  if (this.direccion === "h") {
    this.x -= this.velocidad;
  } else {
    this.y += this.velocidad;
  }

  if (this.x < this.rangoMov.desdeX || this.x > this.rangoMov.hastaX) {
    this.velocidad *= -1;
  }
 
  if (this.y < this.rangoMov.desdeY || this.y > this.rangoMov.hastaY) {
    this.velocidad *= -1;
  }
};
ZombieConductor.prototype.atacar = function(jugador) {
  jugador.perderVidas(Jugador.vidas);
};
