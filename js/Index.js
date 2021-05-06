
tinymce.init({
    selector: '#descripcion-txt',
    height: 200,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  });
  
const pokemones = [];

const eliminarPokemon = async function(){
  let res = await Swal.fire({
    title:`Desea enviar al profesor oak el pokemon ${pokemones[this.nro].nombre}?`,
    showCancelButton:true,
    confirmButtonText:"Si,enviar!"
  })
  if(res.isConfirmed){
    pokemones.splice(this.nro,1);
    cargarTabla();
    Swal.fire("Pokemon enviado al profesor oak")
  } else {
    Swal.fire("Operacion cancelada");
  }
  console.log(this.nro);
}

const cargarTabla = ()=>{
  //1. obtener referencia a la tabla
  //2. recorrer la lista de pokemones
  //3. por cada pokemon generar una fila (tr)
  //4. por cada atributo (nombre,tipo,descripcion and so on)(td)
  //5. agregar las celdas al tr
  //6. agregar el tr a la tabla
  let tbody = document.querySelector("#tabla-tbody");
  tbody.innerHTML = "";
  for(let i=0; i < pokemones.length; ++i){
    let p = pokemones[i];
    let tr = document.createElement("tr");
    let tdNro = document.createElement("td");
    tdNro.innerText = (i+1);
    let tdNombre = document.createElement("td");
    tdNombre.innerText = p.nombre;
    if(p.legendario){
      tdNombre.classList.add("text-warning")
    }
    let tdTipo = document.createElement("td");
    let icono = document.createElement("i");
    if(p.tipo == "fuego"){
      //<i class="fas fa-fire"></i>
      //agregar clases a un elemento
      icono.classList.add("fas","fa-fire","text-danger","fa-3x");
    }else if(p.tipo == "planta"){
      //<i class="fas fa-leaf"></i>
      icono.classList.add("fas","fa-leaf","text-success","fa-3x");
    }else if(p.tipo == "electrico"){
      //<i class="fas fa-bolt"></i>
      icono.classList.add("fas","fa-bolt","text-warning","fa-3x");
    }else if(p.tipo == "agua"){
      //<i class="fas fa-tint"></i>
      icono.classList.add("fas","fa-tint","text-primary","fa-3x");
    }else if(p.tipo == "normal"){
      //<i class="fas fa-star"></i>
      icono.classList.add("fas","fa-star","text-info","fa-3x");
    }
    tdTipo.classList.add("text-center");
    tdTipo.appendChild(icono);
    let tdDesc = document.createElement("td");
    tdDesc.innerHTML = p.descripcion;
    let tdAcciones = document.createElement("td");
    tdAcciones.classList.add("text-center")
    let boton = document.createElement("button"); //crear elemento
    boton.classList.add("btn", "btn-danger"); //cambiar clases de los elementos
    boton.innerText = "Enviar al profesor oak" //cambiar texto de un elemento
    boton.nro = i;
    boton.addEventListener("click",eliminarPokemon);
    tdAcciones.appendChild(boton); //agregar un elemento dentro de otro
    tr.appendChild(tdNro);
    tr.appendChild(tdNombre);
    tr.appendChild(tdTipo);
    tr.appendChild(tdDesc);
    tr.appendChild(tdAcciones);
    tbody.appendChild(tr);
  }
  
};

  

document.querySelector("#registrar-btn").addEventListener("click", ()=>{
    //value es para obtener el valor de los input de texto
    let nombre = document.querySelector("#nombre-text").value;
    //esto lo sque de la pagina del tinymce, es para obtener lo escrito
    let descripcion = tinymce.get("descripcion-txt").getContent();
    //checked indica si el radiobutton esta seleccionado
    let legendario = document.querySelector("#legendario-si").checked;
    //el tipo se obtiene igual que los input
    let tipo = document.querySelector("#tipo-select").value;
    console.log("Hola Mundo!" + nombre,descripcion,legendario,tipo);

    //Como crear un objeto
    let pokemon = {};
    pokemon.nombre = nombre;
    pokemon.descripcion = descripcion;
    pokemon.legendario = legendario;
    pokemon.tipo = tipo;
    console.log(pokemon);
    //Como guardar en una lista de elementos
    pokemones.push(pokemon); // append
    cargarTabla();
    //titulo,texto,tipo: success,info,danger,warning
    Swal.fire("Exito!","Pokemon registrado", "success");
});

document.querySelector("#limpiar-btn").addEventListener("click", ()=>{
  document.querySelector("#nombre-txt").value = "";
  //document.querySelector("#descripcion-txt").value = ""; //no va a funcioanr
  tinymce.get("descripcion-txt").setContent("");
  document.querySelector("#legendario-no").checked = true;
  document.querySelector("#tipo-select").value = "planta";
});