
export function addOrder(order){
    return new Promise(async (resolve)=>{
        const response = await fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order)
          })
        const data = await response.json()
        resolve({data})
    })
}


export function fetchAllOrders(){
    return new Promise(async (resolve)=>{
        const response = await fetch('https://dummyjson.com/products')
        const data = await response.json()
        resolve({data})
    })
}


export function updateOrder(order){
    return new Promise(async (resolve)=>{
        const response = await fetch(`https://dummyjson.com/products/${order.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order)
          })
        const data = await response.json()
        resolve({data})
    })
}