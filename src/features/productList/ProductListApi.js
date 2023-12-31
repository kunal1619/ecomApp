export function fetchProductItem(){
    return new Promise(async (resolve)=>{
        const response = await fetch(`${import.meta.env.VITE_DEV_LINK}/all-products`)
        const data = await response.json()
        resolve({data})
    })
}


export function fetchProductByFilter(filter){

    const categories = filter.category;
    const sorting = filter.sortby
     
    const queryParams = new URLSearchParams({
        sorting : sorting,
        categories : categories
    })

 
    return new Promise(async (resolve)=>{
        const response = await fetch(`${import.meta.env.VITE_DEV_LINK}/products/${queryParams}`)
        const data = await response.json()
        resolve({data})
    })
}

export function fetchShortedProduct(sortBy){

    return new Promise(async (resolve)=>{
        const response = await fetch(`${import.meta.env.VITE_DEV_LINK}/sortProducts/${sortBy}`)
        const data = await response.json()
        resolve({data})
    })
}


export function fetchPaginationData(pageData){

    let limit = (pageData.pageData[0] - 1)*5

    return new Promise(async (resolve)=>{
        const response = await fetch(`https://dummyjson.com/products?limit=${pageData.pageData[1]}&skip=${limit}`)
        const data = await response.json()
        resolve({data})
    })
}


export function fetchSelectedProduct(id){


    return new Promise(async (resolve)=>{
        const response = await fetch(`${import.meta.env.VITE_DEV_LINK}/selectedProduct/${id}`)
        const data = await response.json()
        resolve({data})
    })
}

//admin part

export function createProduct(product){

    return new Promise(async (resolve)=>{
        const response = await fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
          })
        const data = await response.json()
        resolve({data})
    })
}


export function updateProduct(product){

    return new Promise(async (resolve)=>{
        const response = await fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
          })
        const data = await response.json()
        resolve({data})
    })
}

