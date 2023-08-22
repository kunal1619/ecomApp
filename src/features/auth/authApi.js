export function createNewUser(userInfo){

    return new Promise(async (resolve)=>{
        const response = await fetch(`${import.meta.env.VITE_DEV_LINK}/signup`, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(userInfo)
        })
        const data = await response.json()
        resolve({data})
    })
}



export function fetchLoginUser(userInfo){
    return new Promise(async (resolve)=>{
        const response = await fetch(`${import.meta.env.VITE_DEV_LINK}/login`, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(userInfo)
        })
        const data = await response.json()
        resolve({data})
    })
}




