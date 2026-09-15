


document.addEventListener('DOMContentLoaded', () =>{
  consultingdata()
  
  
});
// const modals2 = document.getElementById('modals2')
// const registro = document.getElementById('Registrate')
// const formulario2 = document.getElementById('formulariosi')
const contenedor = document.querySelector('tbody')
const formu = document.querySelector('form')
const nombre = document.getElementById('nombre')
const cedula = document.getElementById('cedula')
const email = document.getElementById('email')
const hora_llegada = document.getElementById('hora_llegada')
const botoncrearrr = document.getElementById("botoncrear")
const toditoo = document.querySelectorAll("input")
const fecha = new Date()
  const modalarticle = new bootstrap.Modal(document.getElementById('modalarticle'))
const pag1 = document.getElementById('formulariosi')
const pag2 = document.getElementById('Registrate')

const cambiarpantalla1 = () => {
  pag2.classList.remove("visible")
  pag2.classList.add("oculto")

  pag1.classList.remove("oculto")
  pag1.classList.add("visible")
}

document.getElementById("boton47").addEventListener("click", cambiarpantalla1)
const formatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true
});
const formattedDate = formatter.format(fecha).replace(/,/g, '');

const  consultingdata = async () => {
  const response = await fetch('http://localhost:8080/registros', { 
    method:"GET", 
    headers:{
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
      
    }
  })
  
  const data = await response.json() 
  tabladelcno(data) 
  
  return data
  
}
//consultingdata()



function mostrarAlerta(tipo, mensaje) {

  const prev = document.getElementById('alerta-registro');
  if (prev) prev.remove();

  const div = document.createElement('div');
  div.id = 'alerta-registro';
  div.setAttribute('role', 'alert');
  div.setAttribute('aria-live', 'assertive');

 
  const clasebusS = tipo === 'exito' ? 'alert-success' : 'alert-danger';
  div.className = `alert ${clasebusS} alert-dismissible fade show mt-3`;
  div.innerHTML = `
    <strong>${tipo === 'exito' ? '✔ Registro exitoso' : '✖ Error'}</strong> — ${mensaje}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
  `;

  
  const boton = document.getElementById('botoncrear');
  if (boton && boton.parentNode) {
    boton.parentNode.insertBefore(div, boton.nextSibling);
  } else {
    document.body.appendChild(div);
  }


  setTimeout(() => {
    if (div && div.parentNode) {
      div.classList.remove('show');
      setTimeout(() => div.remove(), 300);
    }
  }, 5000);
}
// ───────────────────────────────────────────────────────────────────────────────

const CreateData =  async () => {
  
  opcion ='crear'
  const algonuevo = {
    nombre: document.getElementById ('nombre').value,
    cedula: document.getElementById ('cedula').value,
    email: document.getElementById ('email').value,
    hora_llegada: new Date()
  }
  
  try {
    const response = await fetch('http://localhost:8080/registros',{
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre: algonuevo.nombre,
        cedula: algonuevo.cedula,
        email: algonuevo.email,
        hora_llegada: algonuevo.hora_llegada
      })
    });
    
    const data = await response.json();
    console.log(data);
    
    if (response.ok) {
     
      mostrarAlerta('exito', 'El registro fue creado correctamente.');
      consultingdata();
      toditoo.forEach(e => { e.value = ""; });
    } else {
 
      const msg = data.error || data.message || 'No se pudo crear el registro.';
      mostrarAlerta('error', msg);
    }
    
// formulario2.classList.remove('viisble')
// formulario2.classList.add('oculto')

// modals2.classList.remove('oculto')
//   document.getElementById('cerraelmodal').addEventListener('click',() => {

// modals2.classList.remove('visible')
// setTimeout(() => modalarticle.classList.add(oculto), 300)
// formulario2.reset();



  // })

    return data;
  } catch (err) {
    console.error(err);
    mostrarAlerta('error', 'No se pudo conectar con el servidor. Verifica que el backend esté activo.');
  }
}
    const tabladelcno = (data) => {
      console.log(data)
      let resultados = '';
      data.forEach(element => {
        
        
        
        
        resultados += `<tr class="text-center" >
        <td class="visually-hidden">${element.id}</td>
        <td>${element.nombre ?? "nombre default"}</td>
        <td>${element.cedula ?? ""}</td>
        <td>${element.email ?? ""}</td>
        <td>${element.hora_llegada ?? ""}</td>
        <td> <button id="editar" class="btn btn-warning"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brush" viewBox="0 0 16 16">
        <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.1 6.1 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.1 8.1 0 0 1-3.078.132 4 4 0 0 1-.562-.135 1.4 1.4 0 0 1-.466-.247.7.7 0 0 1-.204-.288.62.62 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896q.19.012.348.048c.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04M4.705 11.912a1.2 1.2 0 0 0-.419-.1c-.246-.013-.573.05-.879.479-.197.275-.355.532-.5.777l-.105.177c-.106.181-.213.362-.32.528a3.4 3.4 0 0 1-.76.861c.69.112 1.736.111 2.657-.12.559-.139.843-.569.993-1.06a3 3 0 0 0 .126-.75zm1.44.026c.12-.04.277-.1.458-.183a5.1 5.1 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.59 1.927-5.566 4.66-7.302 6.792-.442.543-.795 1.243-1.042 1.826-.121.288-.214.54-.275.72v.001l.575.575zm-4.973 3.04.007-.005zm3.582-3.043.002.001h-.002z"/>
        </svg></button><button id="eliminar" class="btn btn-danger"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
        </svg> </button></td>
        </tr>`
        
        
      })
  
      if (contenedor !== null){
        contenedor.innerHTML = resultados
      }
      
    }
    const on = (random, event, selector, handler ) => {
      console.log(random)
      
      random.addEventListener(event, e => {
        if(e.target.closest(selector)){
          handler(e)
        }
      })
    }
    
    on(document, 'click', '#eliminar', e =>{
      const fila = e.target.parentNode.parentNode
      const ID = fila.firstElementChild.innerHTML
   
      console.log("BORRADO");
      
      
      (async () => {
        const response = await fetch("http://localhost:8080/registros/"+ID,{
          method:"DELETE",
          headers:{
            "Content-Type": "application/json"
            
          },
          
        })
        
        console.log(fila)
        console.log(ID)
        
        
        consultingdata()
        return response
      })();
      
    })
    
    let idForm = 0 
    on(document, 'click', '#editar', e =>{
      modalarticle.show()
      
      console.log(toditoo)
      console.log(cedula)
      
      if (opcion ='editar'){
        document.querySelector("#botoncrear").classList.add("visually-hidden")
        document.querySelector("#botoneditar").classList.remove("visually-hidden")
      }
      
      
      const fila = e.target.parentNode.parentNode
      const ID = fila.firstElementChild.innerHTML
      const nameform = fila.children[1].innerHTML
      const cedulas = fila.children[2].innerHTML
      const emails = fila.children[3].innerHTML
   
      idForm = ID
      nombre.value = nameform
      cedula.value = cedulas
      email.value = emails

      
      opcion = 'editar'
      console.log("BORRADO");
      
    })
    
    const Edit =  async () => {
      try {
        
        const algonuevo = {
          nombre: document.getElementById ('nombre').value,
          cedula: document.getElementById ('cedula').value,
          email: document.getElementById ('email').value,
          hora_llegada: formattedDate
        }
      
     modalarticle.hide()
        consultingdata(); 
        const response = await fetch('http://localhost:8080/registros/'+idForm,{
          method:"PUT",
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            nombre: algonuevo.nombre,
            cedula: algonuevo.cedula,
            email: algonuevo.email,
          hora_llegada: algonuevo.hora_llegada

            
          })})
     
          console.log('ok')
          const data = await response.json();
          
          
          
          return data
        } catch (error) {
          console.log(error)
          
        }
      }
      