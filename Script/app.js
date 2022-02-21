

// evento que carga los datos cuando se carga la pagina
document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})
//consumir el api para pintar las imagenes
//variable de los obj jason
const fetchData = async () => {
    try {
        //espera que se lea la informacion en api.json
        const respuestaFetch = await fetch('/BaseDatos/api.json')
        //espera que la respuesta viene en json
        const data = await respuestaFetch.json()
        console.log(data)
        console.log(typeof data)
        console.log(data.length)
        console.log(data[0])

        for (var i = 0; i < data.length; i++) {
            document.write("<p> indice del arreglo: " + i + "</p>")
            var elemento = data[i];
            for (var key in elemento) {
                if (key == 'thumbnailUrl') {
                    document.write("<p> <img src='" + elemento[key] + "'> </p>")
                }
                else {
                    document.write("<p> llave : " + key + "- valor:" + elemento[key] + "</p>")
                }
            }
        }

    } catch (error) {
        console.log(error)
    }
}