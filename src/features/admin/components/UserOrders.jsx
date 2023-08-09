import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOrdersAsync, selectAllOrders } from '../../order/orderSlice'
import { updateProductAsync } from '../../productList/ProductSlice'



const UserOrders = () => {
  const allOrders = useSelector(selectAllOrders);

const dispatch = useDispatch()
useEffect(()=>{
  dispatch(fetchAllOrdersAsync())
},[])


//pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(30 / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  

  const products = ()=>{
    if(allOrders.products){
      const currentItems = allOrders.products.slice(startIndex, endIndex);
      return currentItems
    }
  
  }

 

//numbeer to array
  function numberToArray(num) {
    const result = [];
    for (let i = 1; i <= num; i++) {
      result.push(i);
    }
    return result;
  }
  
  //edit
  const myNumber = 30 / itemsPerPage;
  const myArray = numberToArray(myNumber);
  
  const [orderIdStatus, setOrderIdStatus] = useState(-1)
  const [updatedStatus, setUpdatedStatus] = useState('Pending')

  const handleEdit = (item)=>{
    dispatch(updateProductAsync({...item, status : updatedStatus}))
    setOrderIdStatus(item.id)
  }

  const handleStatus =(e)=>{
    setUpdatedStatus(e.target.value)
  }

  const handleView = ()=>{}


  // sort
  const [sortedBy , setSortedBy] = useState('ascToDsc')
  const [sortValue, setSortValue] = useState('id')

  const dataToDisplay = ()=>{
    if(sortValue === 'id' && sortedBy === 'ascToDsc'){
      return  products() && products().slice().sort((a, b) => a.id - b.id)
     }
     if(sortValue === 'id' && sortedBy === 'dscToAsc'){
       return products() && products().slice().sort((a, b) => b.id - a.id)
     }
     if(sortValue === 'rating' && sortedBy === 'ascToDsc'){
       return products() && products().slice().sort((a, b) => a.rating - b.rating)
     }
     if(sortValue === 'rating' && sortedBy === 'dscToAsc'){
       return products() && products().slice().sort((a, b) => b.rating - a.rating)
     }
     if(sortValue === 'price' && sortedBy === 'ascToDsc'){
       return products() && products().slice().sort((a, b) => a.price - b.price)
     }
     if(sortValue === 'price' && sortedBy === 'dscToAsc'){
       return products() && products().slice().sort((a, b) => b.price - a.price)
     }
  }


  const handleSortedBy = (value = 'id')=>{
    setSortValue(!value ? 'id' : value)
    setSortedBy(sortedBy === 'ascToDsc' ? 'dscToAsc' : 'ascToDsc')
    
    dataToDisplay()
  }


  const sortedData = dataToDisplay();



  const arrow = ()=>{

    if(sortedBy === 'ascToDsc'){
      return <img src="/assets/arrowUp.svg" alt="upArrow" className='h-5 w-5'/>
    }
    if(sortedBy === 'dscToAsc'){
      return <img src="/assets/arrowDown.svg" alt="upArrow" className='h-5 w-5'/>
    }
  
  }

  return (
    <>
    {/* component */}
    <div className="overflow-x-auto">
      <div className="min-w-screen min-h-screen flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
        <div className="w-full lg:w-5/6">
          <div className="bg-white shadow-md rounded my-6">
          <table className="min-w-max w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left cursor-pointer flex" >
            
            <span className='flex' onClick={()=>handleSortedBy('id')}>Project{' '} {sortValue==='id' && arrow()}/{' '}</span>
            <span className='flex' onClick={()=>handleSortedBy('rating')}>Rating{' '} {sortValue==='rating' && arrow()}/{' '}</span>
            <span className='flex' onClick={()=>handleSortedBy('price')}>Price{sortValue==='price' && arrow()}</span>
            </th>
            <th className="py-3 px-6 text-left">Client</th>
            <th className="py-3 px-6 text-center">Address</th>
            <th className="py-3 px-6 text-center">Status</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
        { sortedData && sortedData.map((item)=>(
          <tr className="border-b border-gray-200 hover:bg-gray-100" key={item.id}>
            <td className="py-3 px-6 text-left whitespace-nowrap">
              <div className="flex items-center">
                <div className="mr-2">
                <img src={item.images[0]} alt={item.title} className='h-8 w-8 rounded-full object-cover'/>
                </div>
                <span className="font-medium">{item.title}-#{item.rating}-${item.price}</span>
              </div>
            </td>
            <td className="py-3 px-6 text-left">
              <div className="flex items-center">
                <div className="mr-2">
                  <img
                    className="w-6 h-6 rounded-full"
                    src="https://randomuser.me/api/portraits/men/1.jpg"
                  />
                </div>
                <span>User name</span>
              </div>
            </td>
            <td className="py-3 px-6 text-center">
              <div className="flex items-center justify-center">
                user address
              </div>
            </td>
            {orderIdStatus === item.id ? 
              <td className="py-3 px-6 text-center">
              <select onChange={(e)=>handleStatus(e)}>
                <option>Pending</option>
                <option>Dispatch</option>
                <option>Delivered</option>
                <option>Cancel</option>
              </select>
            </td> : 
            <td className="py-3 px-6 text-center">
              <span className={`${updatedStatus === 'Pending' && orderIdStatus === item.id  ? 'bg-purple-200' : updatedStatus === 'Dispatch' && orderIdStatus === item.id  ? 'bg-yellow-200' : updatedStatus === 'Delivered' && orderIdStatus === item.id  ? 'bg-green-200' : updatedStatus === 'Cancel'  && orderIdStatus === item.id ? 'bg-red-300' : 'bg-purple-200'} text-gray-600 py-1 px-3 rounded-full text-xs`}>
                Pending
              </span>
            </td>}
            
           
            <td className="py-3 px-6 text-center">
              <div className="flex item-center justify-center">
                <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110" onClick={handleView}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110" onClick={e=>handleEdit(item)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </div>
                <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>
              </div>
            </td>
          </tr>
        ))}

         

        </tbody>
      </table>
      
  <nav className='m-3'>
    <ul className="list-style-none flex">
      <li>
        <button className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-blue-500 hover:text-white"
        disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}>
          Previous
        </button>
      </li>
      {myArray.map((item)=>(
        <li key={item}>
        <button
          className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-blue-500 hover:text-white"
          onClick={() => setCurrentPage(item)}
        >
          {item}
        </button>
      </li>
      ))}

     <li>
        <button
          className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-blue-500 hover:text-white "
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </li>
    </ul>
  </nav>
          </div>
        </div>
      </div>



    </div>
  </>
  )
}

export default UserOrders





      



  