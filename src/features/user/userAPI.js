//fetch user orders
export function fetchUserOrders(userId){
    return new Promise(async (resolve)=>{
        const response = await fetch('https://dummyjson.com/users/5/carts')
        const data = await response.json()
        resolve({data})
    })
}


export function fetchAndUpdateUserInfo(updatedInfo){

    console.log(updatedInfo);

    return new Promise(async (resolve)=>{
        const response = await fetch(`https://dummyjson.com/users/${updatedInfo.userId}`, {
            method: 'PUT', /* or PATCH */
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedInfo)
          })
        const data = await response.json()
        resolve({data})
    })
}

export function deletUserAddress(userId){
    return new Promise(async (resolve)=>{
        const response = await fetch(`https://dummyjson.com/users/${userId}`)
        const data = await response.json()
        resolve({data})
    })
}