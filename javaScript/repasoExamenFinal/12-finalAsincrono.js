//  12-finalAsincrono.js

function consultaDB( id ){
    return new Promise( (solve, err) => {
        setTimeout( ()=> {
            const db = [
                {id: 1, categoria: 'Frutas'},
                {id: 2, categoria: 'Carnes'},
                {id: 3, categoria: 'Frutas'}
            ]
        },1000)
    })
}

async function idFrutas(){

    try{
        let consultaRealizada = await consultaDB()

        let frutas = consultaRealizada.filter( item => {
            if( item.categoria === 'Frutas' ){
                return item
            }
        })

        let idFrutas = frutas.map( item => {
            return item.id
        })

        console.log( idFrutas )
    } catch( err ){
        console.log("Error" , err)
    }
}