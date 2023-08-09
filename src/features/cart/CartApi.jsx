export function fetchUserCart(cartDataWithUserId){
    return new Promise(async (resolve)=>{
        const response = await fetch('https://dummyjson.com/carts/add', {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          cartDataWithUserId
        )

        })
        const data = await response.json()
        resolve({data})
    })
}

//fetch user cart items

export function fetchUserCartTotalItems(userId){
    return new Promise(async (resolve)=>{
        const response = await fetch(`https://dummyjson.com/carts/user/${userId}`)
        const data = await response.json()
        resolve({data})
    })
}

//update user cart

export function fetchUpdatedItem(updateData){
    return new Promise(async (resolve)=>{
        const response = await fetch(`https://dummyjson.com/carts/${updateData.productId}`, {
            
                method: 'PUT', /* or PATCH */
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId : updateData.productId,
                  merge: true, // this will include existing products in the cart
                  products: [
                    updateData.updatedProduct
                  ]
                })
              
        })
        const data = await response.json()
        resolve({data})
    })
}


//remove item

export function fetchRemovedItem(removeId){
    console.log(removeId);
    return new Promise(async (resolve)=>{
        const response = await fetch(`https://dummyjson.com/carts/${removeId}`, {
            method : 'DELETE'
        })
        const data = await response.json()
        resolve({data})
    })
}

