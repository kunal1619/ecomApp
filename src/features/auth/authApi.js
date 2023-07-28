
export function fetchUser(amount = 1){
    return new Promise(async (resolve)=>{
        const response = await fetch('http://localhost:8080/item')
        const data = await response.json()
        resolve({data})
    })
}