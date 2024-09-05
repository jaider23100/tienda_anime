document.addEventListener('DOMContentLoaded', function () {
    const apiURL = 'http://localhost:5000/api/productos';
  
    // Cargar productos del backend
    function cargarProductos() {
      fetch(apiURL)
        .then(response => response.json())
        .then(data => {
          const productos = data;
          let productosHTML = '';
  
          productos.forEach(producto => {
            productosHTML += `
              <div class="producto">
                <h2>${producto.nombre}</h2>
                <p>Precio: $${producto.precio}</p>
                <button class="eliminar-btn" data-id="${producto.id}">Eliminar</button>
              </div>
            `;
          });
  
          document.getElementById('productos').innerHTML = productosHTML;
  
          // Agregar evento de eliminar
          const eliminarBotones = document.querySelectorAll('.eliminar-btn');
          eliminarBotones.forEach(boton => {
            boton.addEventListener('click', function () {
              const idProducto = this.getAttribute('data-id');
              eliminarProducto(idProducto);
            });
          });
        })
        .catch(error => console.error('Error al cargar los productos:', error));
    }
  
    // Enviar nuevo producto al backend
    const form = document.getElementById('producto-form');
    form.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const nombre = document.getElementById('nombre').value;
      const precio = document.getElementById('precio').value;
  
      const nuevoProducto = {
        id: Date.now(), // Generar un id único
        nombre: nombre,
        precio: parseFloat(precio)
      };
  
      fetch(apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoProducto)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Producto agregado:', data);
        cargarProductos(); // Actualizar lista de productos
      })
      .catch(error => console.error('Error al agregar el producto:', error));
  
      form.reset(); // Limpiar el formulario
    });
  
    // Función para eliminar un producto
    function eliminarProducto(id) {
      fetch(`${apiURL}/${id}`, {
        method: 'DELETE'
      })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        cargarProductos();
      })
      .catch(error => console.error('Error al eliminar el producto:', error));
    }

    cargarProductos();
  });
  