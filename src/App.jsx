import React from "react";
//importamos el css
import './App.css';
//importamos libreria generadora de ID
import { nanoid } from "nanoid";

function App() {
  //----------Creacion de Estados------

  //1)Estado de Relacion con Input donde almacena los datos ingresados
  const[Producto, setProducto]=React.useState('') 

  //2)Estado para Pintar la Lista de Productos
  const[Pintar,setPintar]=React.useState([])

  //3)Estado de ID para Editar
  const[modoEdicion, setModoEdicion]=React.useState(false)

  const[id,setId]=React.useState('')

  //4) Pintar Error
  const [Error, setError]=React.useState(null)

  //-----------Funciones--------------


  //funcion de agregar producto
  const agregarProducto = e =>{

    //reseteamos el Get por defecto del html
    e.preventDefault()

    //Validamos el formulario
    if(!Producto.trim()){
      console.log('no hay producto')
      //pintamos el Error
      setError('Ingrese un Producto *')
      return
    }
    console.log(Producto)

    //llamos a setPintar para crear dentro de el un arry de objetos y asi poder pintarlos en un map
    setPintar([
      ...Pintar,
      {id:nanoid(), propiedadProducto:Producto}
    ])
    setProducto('')
    setError(null)
  }

  //Funcion Eliminar Producto
  const eliminarProducto = id =>{
    const arrayFiltrado =Pintar.filter(item =>item.id !== id)
    setPintar(arrayFiltrado)
  }

  //funcion Editar formulario para boton editar
  const editar=item =>{
    console.log(item)
    setModoEdicion(true)
    setProducto(item.propiedadProducto)
    setId(item.id)
  }

  //Funcion Editar Producto
  const editarProducto = e =>{
    //reseteamos el Get por defecto del html
    e.preventDefault()

    //Validamos el formulario
    if(!Producto.trim()){
      console.log('no hay producto')
      setError('Ingrese un Producto *')
      return
    }

    const arrayEditado = Pintar.map(
      item => item.id === id ? {id, propiedadProducto:Producto} : item
      )
      
    setPintar(arrayEditado)
    setModoEdicion(false)
    setProducto('')
    setId('')
    setError(null)

  }

  return (

    //div contenedor
    <div className="Container-fluid fondo">

      {/*<h1 className="text-center  py-3">CRUD SIMPLE</h1>*/}

      {/*Lista*/}
      <div className="container Lista">
      <h2 className="text-center Tprincipal mt-4">CRUD SIMPLE</h2>
        <div className="row Listacol pb-5">
          <div className="col-8  colum1" >
          
            <h2 className="text-center pt-5">Lista de Productos</h2>
            

            {/* Lista*/}
            
            <ul className="list-group"> 
            {
              Pintar.length === 0 ? 
              (<li className="list-group-item my-1">No hay Productos</li>)
              :
              (
                Pintar.map(item=>(
                  <li className="list-group-item Produc" key={item.id}> 
                    <span className="lead  ">{item.propiedadProducto}</span>
                    <button 
                      className="btn btn-danger btn-sm float-right mx-1"
                      onClick={()=>eliminarProducto(item.id)}
                    >
                      Eliminar
                    </button>
                    <button 
                    className="btn btn-dark btn-sm float-right"
                    onClick={()=>editar(item)}
                    >
                      Editar
                    </button>
                  </li>
                  ))
              )
            }   
            </ul>
          </div>


          {/*Formuario */}
          
          <div className="col-4 ">
          {/*Icono Carrito de compras */}
          <div className="container d-flex justify-content-center py-2 ">
            <div className=" text-center  py-3 circulo">
              <i className="bi bi-cart4 icono "></i>
            </div>
          </div>
             
            <h4 className="text-center py-3">
              {modoEdicion ? 'Editar Producto':' Agregar al carrito'}
            </h4>

            <form onSubmit={modoEdicion ? editarProducto : agregarProducto}>
              {
                Error ? <span className="text-danger">{Error}</span>: null
              }
              <input 
              type="text"
              placeholder="Ingrese el Producto"
              className="form-control mb-2"
              //Relacion Input y estado
              onChange={(e)=>setProducto(e.target.value)}
              value={Producto}
              />
              {
                modoEdicion ?
                (<button className="btn btn-warning btn-block" type="submit">Editar</button>)
                :
                (<button className="btn btn-dark btn-block BotonAgregar" type="submit">Agregar</button>)
              }
              
            </form>

          </div>

        </div>
      </div>
      
    </div>
  );
}

export default App; 
