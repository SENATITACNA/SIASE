class Registro_dispositivo {
  constructor(
    id,
    estado,
    fecha_envio,
    fecha_entrada,
    fecha_salida,
    observacion,
    alumno_id,
    instructor_id,
    guardia_id,
    objeto_id,
    usuario_creacion,
    usuario_modificacion,
    fecha_creacion,
    fecha_modificacion
  ) {
    this.id = id;
    this.estado = estado;
    this.fecha_envio = fecha_envio;
    this.fecha_entrada = fecha_entrada;
    this.fecha_salida = fecha_salida;
    this.observacion = observacion;
    this.alumno_id = alumno_id;
    this.instructor_id = instructor_id;
    this.guardia_id = guardia_id;
    this.objeto_id = objeto_id;
    this.usuario_creacion = usuario_creacion;
    this.usuario_modificacion = usuario_modificacion;
    this.fecha_creacion = fecha_creacion;
    this.fecha_modificacion = fecha_modificacion;
  }
}

module.exports = Registro_dispositivo;