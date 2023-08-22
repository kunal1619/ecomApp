export function fetchUserCart(cartDataWithUserId){
    
    return new Promise(async (resolve)=>{
        const response = await fetch(`${import.meta.env.VITE_DEV_LINK}/addtocart`, {

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
        const response = await fetch(`${import.meta.env.VITE_DEV_LINK}/cart/${userId.userId}`)
        const data = await response.json()
        resolve({data})
    })
}

//update user cart


export function fetchUpdatedItem(updateData){
    
    return new Promise(async (resolve)=>{
        const response = await fetch(`${import.meta.env.VITE_DEV_LINK}/cart/updatecart`, {
            
                method: 'PUT', /* or PATCH */
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    updateData
                )
              
        })
        const data = await response.json()
        resolve({data})
    })
}


//remove item

export function fetchRemovedItem(removeData){

    return new Promise(async (resolve)=>{
        const response = await fetch(`${import.meta.env.VITE_DEV_LINK}/cart/remove`, {
            method : 'PUT',
            headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    removeData
                )
        })
        const data = await response.json()
        resolve({data})
    })
}

