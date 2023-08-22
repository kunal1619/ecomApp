
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchRemovedItemAsync, fetchUserCartTotalItemsAsync, fetchUserUpdatedProductAsync, selectUserCartTotalItems } from './CartSlice'
import { useAlert } from 'react-alert'


export function Cart() {
  const product = useSelector(selectUserCartTotalItems)
console.log(product);
const loginData = localStorage.getItem('loginData');
const alert = useAlert();

let totalQuantity = 0;

  const calculateSubTotalPrice = ()=>{
    let totalPrice = 0;
    product.forEach(element => {
      if(!element.deleted){
        totalPrice += element.product.price * element.quantity;
      totalQuantity += element.quantity
      }
      
    });
    return totalPrice;
  }

  const totalPrice = calculateSubTotalPrice();
 

  const dispatch = useDispatch();

  //update product ko backend banney k baad achhey se develop karna hia

  const handleQuantity = (e, productId, ind)=>{
    e.preventDefault();
    dispatch(fetchUserUpdatedProductAsync({quantity : +e.target.value, productId : productId}))
    
  }

//remove item from cart

const handleRemove=(e, removeId) =>{

  alert.show('Product removed successfully')

  dispatch(fetchRemovedItemAsync({
    productId : removeId,
    deleted : true
  }))
}

//fetch all items from cart


// if(loginData){

//   const data = JSON.parse(loginData);
//   const id = data.id;

//   useEffect(()=>{
//     dispatch(fetchUserCartTotalItemsAsync(
//       {userId : id}
//     ))
//   },[])

// }


  

  return (
   <>
   <div className='flex justify-center items-center'>
   <div className="flex h-full w-10/12 flex-col bg-white shadow-xl mt-8">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <div className="text-lg font-medium text-gray-900">Shopping cart</div>

                 
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">

                        <div>
                          {totalQuantity === 0 && 
                            <h2 className='text-xl text-red-600 tracking-wide'>Your cart is empty</h2>
                          }
                          </div>

                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {product && product.map((product, ind) => (

                              product.deleted === false &&

                              <li key={product._id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.product.images[0]}
                                    alt={product.product.title}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        {product.product.title}
                                      </h3>
                                      <p className="ml-4">{product.product.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">color</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className='flex space-x-1 items-center'>
                                    <p className="text-gray-500">Qty </p>
                                    <select value={product.quantity} onChange={(e)=>handleQuantity(e, product._id, ind)}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                    </div>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        onClick={e => handleRemove(e, product._id)}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${totalPrice}</p>
                      </div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                      <p className="mt-0.5 text-sm text-gray-500">Total items in cart</p>
                        <p>{totalQuantity}</p>
                      </div>
           
                      <div className="mt-6">
                      <Link to={'/checkout'}>
                      <button
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </button>
                      </Link>
                        
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{' '}
                          <Link to={'/'}>
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                          </Link>
                        
                        </p>
                      </div>
                    </div>
                  </div>
   </div>           
   </>
  )
}
