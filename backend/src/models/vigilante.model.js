class Vigilante {
  constructor(
    id,
    vigilante_id,
    nombre,
    apellido,
    turno,
    estado,
    usuario_creacion,
    usuario_modificacion,
    fecha_creacion,
    fecha_modificacion
  ) {
    this.id = id;
    this.vigilante_id = vigilante_id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.turno = turno;
    this.estado = estado;
    this.usuario_creacion = usuario_creacion;
    this.usuario_modificacion = usuario_modificacion;
    this.fecha_creacion = fecha_creacion;
    this.fecha_modificacion = fecha_modificacion;
  }
}

module.exports = Vigilante;