const db = require("../config/db");

const getInstructores = (callback) => {
    const sql = "SELECT nombre, apellido, estado FROM instructor";

    db.query(sql, (err, resultados) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, resultados);
        }
    });
};

const getDispositivosAlumno = (callback) => {
    const sql = "SELECT tipo, marca, modelo, numero_serie, descripcion FROM dispositivos_x_alumno"

    db.query(sql, (err, resultados) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, resultados);
        }
    });
};

module.exports = {
  getInstructores,
  getDispositivosAlumno
};