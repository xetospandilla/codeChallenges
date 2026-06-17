//  06-asyncArrays.js

function giveArray(){
    return new Promise( ( solve, err )=>{

        setTimeout( () => {

            const arr =[
                { id: 1, price: 10 },
                { id: 2, price: 30 },
                { id: 3, price: 50 }
            ]

            solve( arr )

        }, 1000)

    })
}

async function expensiveItemsTotalPrice(){

    try{
        let res = await giveArray()

        let expensiveItems = res.filter( item => {
            if( item.price >= 20 ){
                return item
            }
        })

        let expensiveItemsTotal = expensiveItems.reduce( ( acc, item )  => {
            return acc += item.price
        },0)

        console.log( expensiveItemsTotal )
    } catch( err ){

        console.log( "Error", err )

    }
}