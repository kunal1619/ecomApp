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
        const response = await fetch(`${import.meta.env.VITE_DEV_LINK}/user_profile`, {
            method: 'POST', /* or PATCH */
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedInfo)
          })
        const data = await response.json()
        resolve({data})
    })
}

//fetchsuer
export function fetchuserinfo(userid){
    console.log(userid);

    return new Promise(async (resolve)=>{
        const response = await fetch(`${import.meta.env.VITE_DEV_LINK}/user/${userid}`)
        const data = await response.json()
        resolve({data})
    })
}

//fetch user addresses
export function fetchUserAddresses(userId){

    return new Promise(async (resolve)=>{
        const response = await fetch(`${import.meta.env.VITE_DEV_LINK}/all_addresses/${userId.userId}`)
        const data = await response.json()
        resolve({data})
    })
}

export function fetchAndUpdateUserAddress(address){

    return new Promise(async (resolve)=>{
        const response = await fetch(`${import.meta.env.VITE_DEV_LINK}/addresses`, {
            method: 'POST', /* or PATCH */
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(address)
          })
        const data = await response.json()
        resolve({data})
    })
}

//edit user address
export function editUserAddress(address){

    console.log(address);

    return new Promise(async (resolve)=>{
        const response = await fetch(`${import.meta.env.VITE_DEV_LINK}/edit_address`, {
            method: 'PUT', /* or PATCH */
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(address)
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