const express = require('express');
const cors = require('cors');
const db = require('./db');



const app = express({ limit:'5mb'});
const PORT = 8080;

app.use(cors());
app.use(express.json());


function validarRegistro(req, res, next) {
  const { cedula, nombre, email, hora_llegada, firma } = req.body || {};
  const campos = [cedula, nombre, email, hora_llegada, firma ];

  const faltanCampos = campos.some(
    (valor) =>
      valor === undefined ||
      valor === null ||
      (typeof valor === 'string' && valor.trim() === '')
  );

  if (faltanCampos) {
    return res.status(400).json({
      error:
        'Cédula, nombre, email y hora de llegada son requeridos. La cédula debe tener exactamente 11 dígitos.'
    });
  }

  if (typeof cedula !== 'string' || !/^[0-9]{11}$/.test(cedula)) {

    return res.status(400).json({
      error:
      'La cédula debe contener exactamente 11 dígitos, sin guiones, espacios ni letras.'
    });
  }
  
  if (typeof email !== 'string' || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return res.status(400).json({
      error:
        'el email debe contener @gmail'
    });
  }

  next();
}

// Obtener todos los registros.
app.get('/registros', (req, res) => {
  const registros = db.prepare('SELECT * FROM registros').all();

  return res.json(registros);
});

app.post('/registros', validarRegistro, (req, res) => {

  const { cedula, nombre, email, hora_llegada, firma } = req.body;

  const result = db.prepare(`
    INSERT INTO registros (cedula, nombre, email, hora_llegada, firma )
    VALUES (?, ?, ?, ?, ?)
  `).run(cedula, nombre, email, hora_llegada, firma);

  return res.status(201).json({ id: result.lastInsertRowid });
});


app.delete('/registros/:id', (req, res) => {
  const registros = db.prepare('DELETE FROM registros WHERE id = ?').run(req.params.id);

if (!registros){

  console.log('error')
  res.sendStatus(400);

}

res.sendStatus(204);


});

app.put('/registros/:id', async (req, res)=> {
 const { cedula, nombre, email, hora_llegada } = req.body;


 const registros = db.prepare('UPDATE registros SET cedula = ?, nombre = ?, email = ?, hora_llegada = ?  WHERE id = ?').run(cedula, nombre, email, hora_llegada, req.params.id);


if (!cedula || !nombre || !email || !hora_llegada ) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
    
  }

  if (typeof cedula !== 'string' || !/^[0-9]{11}$/.test(cedula)) {

    return res.status(400).json({
      error:
      'La cédula debe contener exactamente 11 dígitos, sin guiones, espacios ni letras.'
    });
  }
  


})


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});





