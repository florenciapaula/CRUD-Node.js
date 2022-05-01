//json-server --watch db.json

///////url de la api en el live server

const url = "http://localhost:3000/people";

//////declaracion del objeto product

const product = {
  nombre: "",
  precio: "",
  descripcion: ""

};

//////////////prevent default del formulario para que no se recargue al submitir

function evitarRecarga(event) {
  event.preventDefault();
  return false;
}

////////con esta funcion tomamos los datos ingresados por el usuario en los inputs

function tomarDatos() {
  product.nombre = document.getElementById("name").value;
  product.precio = document.getElementById("price").value;
  product.descripcion = document.getElementById("desc").value;
}

function tomarId() {
  product.id = document.getElementById("id").value;
  return id;
}

////llenar los inputs con los datos del resultado
function mostrarDatos(data) {
  document.getElementById("id").value = data.id;
  document.getElementById("name").value = data.product.nombre;
  document.getElementById("price").value = data.product.precio;
  document.getElementById("desc").value = data.product.descripcion;
}

////////crear un nuevo registro, cuando hacemos click en el boton crear, llamamos a esta funcion

function alta() {

  tomarDatos();

  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ product }),
  });
  
}

function baja() {

  tomarId();

  return fetch(url + `/${product.id}`, {
    method: "DELETE",
  });
}

function buscar() {

  tomarId();

  borrarListado();

  const http = new XMLHttpRequest();
  http.open("GET", "http://localhost:3000/people/" + `${product.id}`);
  http.send();
  http.onload = () => {
    const data = JSON.parse(http.response);

    mostrarDatos(data);

    escribirHtmlBusqueda(data);
  };
}

function getList() {
  const http = new XMLHttpRequest();
  http.open("GET", url);
  http.send();
  http.onload = () => {
    const data = JSON.parse(http.response);

  };
}

function actualizar() {
  ///tomar los nuevos datos de los inputs y actualizar

  tomarDatos();

  fetch("http://localhost:3000/people/" + `${product.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product }),
  });
}

//////////////con esta funcion creamos elementos de html para mostrarlos en la pagina

function escribirHtmlBusqueda(data) {
  const node = document.createElement("li");
  const textnode = document.createTextNode(
    "Id:" +
      data.id +
      " " +
      "Nombre:" +
      data.product.nombre +
      " " +
      "Precio:" +
      data.product.precio +
      " " +
      "Descripcion:" +
      data.product.descripcion
  );
  node.appendChild(textnode);
  document.getElementById("lista").appendChild(node);
}


function escribirHTML(data) {

  for (i = 0; i <= data.length; i++) {
    const node = document.createElement("li");

    const textnode = document.createTextNode(
      "Id:" +
        data[i].id +
        " " +
        `<br>` +
        "Nombre:" +
        data[i].product.nombre +
        " " +
        `<br>` +
        "Precio:" +
        data[i].product.precio +
        " " +
        `<br>` +
        "Descripcion:" +
        data[i].product.descripcion
    );

    node.appendChild(textnode);
    document.getElementById("lista").appendChild(node);
  }
}

