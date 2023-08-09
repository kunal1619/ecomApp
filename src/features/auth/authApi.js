
export function createNewUser(userInfo){
    return new Promise(async (resolve)=>{
        const response = await fetch('https://dummyjson.com/users/add', {
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
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                username: 'kminchelle',
                password: '0lelplR',
            })
        })
        const data = await response.json()
        resolve({data})
    })
}


export function logOutUser(userId){
    return new Promise(async (resolve)=>{
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                username: 'kminchelle',
                password: '0lelplR',
            })
        })
        const data = await response.json()
        resolve({data})
    })
}



