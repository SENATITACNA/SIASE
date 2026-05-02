class Instructor {
  constructor(id, nombre, apellido, estado) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.estado = estado;
  }
}

class DispositivoAlumno {
  constructor(id, tipo, marca, modelo, numero_serie) {
    this.id = id;
    this.tipo = tipo;
    this.marca = marca;
    this.modelo = modelo;
    this.numero_serie = numero_serie;
  }
}

module.exports =
{
  Instructor,
  DispositivoAlumno
}