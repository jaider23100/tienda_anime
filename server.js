const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Esto permite solicitudes desde el frontend
app.use(cors());
app.use(express.json());

// Datos simulados
let productos = [
  { id: 1, nombre: 'Producto 1', precio: 10 },
  { id: 2, nombre: 'Producto 2', precio: 20 },
  { id: 3, nombre: 'Producto 3', precio: 30 }
];

// RUTA DE LA API : GET Y POST
app.get('/api/productos', (req, res) => {
  res.json(productos);
});

app.post('/api/productos', (req, res) => {
  const nuevoProducto = req.body;
  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
});

//ESTA ES LA RUTA PARA ELIMINAR PRODUCTOS POR ID, OJO.
app.delete('/api/productos/:id', (req, res) => {
  const idProducto = parseInt(req.params.id);
  productos = productos.filter(producto => producto.id !== idProducto);
  res.status(200).json({ message: `Producto con ID ${idProducto} eliminado.` });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

//SUERTE REY
