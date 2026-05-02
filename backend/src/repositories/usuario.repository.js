const db = require("../config/db");
const getInstructores = (callback) => {
    const sql = "SELECT * FROM instructor";

    db.query(sql, (err, resultados) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, resultados);
        }
    });
};

const getDispositivosAlumno = (callback) => {
    const sql = "SELECT * FROM dispositivos_x_alumno"

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