import React from 'react'
import { useState } from 'react'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { selectCreatedUser, selectLogedInUser } from '../features/auth/authSlice';
import { selectUserCartTotalItems } from '../features/cart/CartSlice';
import { Link, Navigate } from 'react-router-dom';
import { placeOrderAsync, selectCurentOrder } from '../features/order/orderSlice';
import { fetchUserAddressesAsync, fetchUserAllAddressesAsync, selectUserAddresses, selectUserInfo, updateUserInfoAsync } from '../features/user/userSlice';
import { useEffect } from 'react';

//order palace karney pe cart delete ho jana chahiye wo abhi banana hai mere ko

const Checkout = () => {

  const loginData = localStorage.getItem('loginData')

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

  const currentOrder = useSelector(selectCurentOrder)
  const userAllInfo = useSelector(selectUserInfo) //adress ko update userAllinfo se ho karna hia
  const userAddresses = useSelector(selectUserAddresses)
  const [triggerEffect, setTriggerEffect] = useState(false);

  //update address
  const dispatch = useDispatch();
  const userInfo = useSelector(selectCreatedUser)
  const logedInuser = useSelector(selectLogedInUser)

  const [adress, setAdress] = useState([])

  const onSubmit = (data) => {
    if(loginData){
      const userdata = JSON.parse(loginData);
      const id = userdata.id;

      dispatch(fetchUserAddressesAsync(
        {userId : id,
        address : data}
      ))


    }
      setTriggerEffect(true)
  }


  useEffect(()=>{
  
    if(loginData){
      const userdata = JSON.parse(loginData);
      const id = userdata.id;
  
      dispatch(fetchUserAllAddressesAsync(
        {userId : id}
      ))

      setTriggerEffect(false)

    }
  },[triggerEffect])

  //choose address
  const [chooseAdd, setChooseAdd] = useState(null)


 //cart items
 const selectedCartItems = useSelector(selectUserCartTotalItems)

 const totalItems = ()=>{
  let totalCartItems = 0;
   selectedCartItems.forEach(element => {
    if(!element.deleted){
        totalCartItems += 1;
    }
  });
  return totalCartItems;
}
const cartTotalItems = totalItems();

 const calculateSubTotalPrice = ()=>{
  let totalPrice = 0;
  let totalArray = []
     selectedCartItems.forEach(element => {
      if(!element.deleted){
        totalPrice += element.product.price * element.quantity
        totalArray.push(element.product.price * element.quantity)
      }
     
    });
    console.log(totalArray);
  
  return totalPrice;
}

const totalCartPrice = calculateSubTotalPrice();

//pay method

const [payMethod, setPayMethod] = useState("")

const handlePayMetod = (e)=>{
  if(e.target.id === 'radio_1'){
    setPayMethod("Cart pay")
  }
  if(e.target.id === 'radio_2'){
    setPayMethod("Cash pay")
  }
}

//handleorder

const handleOrder = ()=>{
  dispatch(placeOrderAsync({
    user : userInfo ? userInfo.id : logedInuser.id,
    address : adress.chooseAdd,
    selectedCartItems,
    paymentMethod : payMethod,
    totalPrice : totalCartPrice,
    status : "pending"
  }))
}

  return (
  
    <div>  
    {currentOrder && <Navigate to={`/order-success/${currentOrder.id}`} replace={true}/>}
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
  <a className="text-2xl font-bold text-gray-800">sneekpeeks</a>

</div>
<div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
  <div className="px-4 pt-8">
    <p className="text-xl font-medium">Order Summary</p>
    <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
    {cartTotalItems > 0 ? selectedCartItems.map((item, ind)=>(
    
    !item.deleted &&
           
      <div className="flex flex-col rounded-lg bg-white sm:flex-row" key={ind}>
        <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={item.product.images[0]} alt="" />
        <div className="flex w-full flex-col px-4 py-4">
          <span className="font-semibold">{item.product.title}</span>
          <span className="float-right text-gray-400">Quantity</span>
          <span className="float-right text-gray-400">{item.quantity}</span>
          <p className="text-lg font-bold">${item.product.price * item.quantity}</p>
        </div>
      </div>

     
    )) : 
    <div className='h-20 w-full flex items-center justify-center'>
      <p className='text-xl text-gray-700'>No Item in cart</p>
    </div>}


    </div>

    <p className="mt-8 text-lg font-medium">Payment Methods</p>
    <form className="mt-5 grid gap-6" >
      <div className="relative">
        <input className="peer hidden" id="radio_1" type="radio" name="radio"  onChange={(e)=>handlePayMetod(e)}/>
        <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
        <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_1">
          {/* <img className="w-14 object-contain" src="/images/naorrAeygcJzX0SyNI4Y0.png" alt="" /> */}
          <div className="ml-5">
            <span className="mt-2 font-semibold">Card Payment</span>
            <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
          </div>
        </label>
      </div>
      <div className="relative" >
        <input className="peer hidden" id="radio_2" type="radio" name="radio"  onChange={(e)=>handlePayMetod(e)}/>
        <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
        <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_2">
          {/* <img className="w-14 object-contain" src="/images/oG8xsl3xsOkwkMsrLGKM4.png" alt="" /> */}
          <div className="ml-5">
            <span className="mt-2 font-semibold">Cash On Delivery</span>
            <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
          </div>
        </label>
      </div>
    </form>
  </div>
  <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
    <p className="text-xl font-medium">Address Details</p>
    <p className="text-gray-400">Add a new address or choose from existing address to place order</p>

   
    <div className="">
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name" className="mt-4 mb-2 block text-sm font-medium">Full name</label>
      <div className="relative">
        <input type="text" id="name" name="name" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="enter your full name" {...register("name", { required: true })}/>
        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3"
        >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
       <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
     </svg>
        </div>
        {errors.name && <span>Name is required</span>}
      </div>
      
      <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">Email</label>
      <div className="relative">
        <input type="text" id="email" name="email" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="your.email@gmail.com"{...register("email", { required: true })} />
        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
        </div>
        {errors.email && <span>Email is required</span>}
      </div>


      <label htmlFor="billing-address" className="mt-4 mb-2 block text-sm font-medium">Billing Address</label>
      <div className="flex flex-col sm:flex-row space-x-2">
        <div className="relative flex-shrink-0 sm:w-7/12">
          <input type="text" id="billing-address" name="billing-address" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Full address" 
            {...register("streetAddress", { required: true })}
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <img className="h-4 w-4 object-contain" src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg" alt="" />
          </div>
          {errors.streetaAddress && <span>This field is required</span>}
        </div>
        <select type="text" name="billing-state" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" {...register("state", { required: true })}>
          <option value="">State</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="Srilanka">Srilanka</option>
        </select>
        {errors.state && <span>This field is required</span>}
        <input type="number" name="billing-zip" className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Pin code" {...register("pin", { required: true })}/>
        {errors.pin && <span>This field is required</span>}
      </div>

      <div className='text-end'>
<button  type='submit' className="mt-4 mb-8 w-1/3 rounded-md bg-gray-800 px-5 py-2 font-medium text-white">ADD</button>
</div>

      </form>

      

      <label htmlFor="billing-address" className="mt-4 mb-2 block text-sm font-medium">Chose from existing address</label>
      <div className='w-full h-auto bg-white border border-gray-200 rounded-md shadow-sm'>


{/* <!-- Dropdown menu --> */}
<div  className=" bg-white divide-y divide-gray-100 rounded-lg  ">
    <ul className="p-3 space-y-1 text-sm text-gray-700" >
{userAddresses && userAddresses.length > 0 && userAddresses !== "User not found" ? userAddresses.map((elm, ind)=> (
  
  <li key={elm._id}>
        <div className="flex justify-between  items-center p-2 rounded hover:bg-gray-100" >
        <div className="flex justify-between">
        <div className="flex items-center h-5">
              <input id="helper-radio-4" name="helper-radio" type="radio" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "/>
          </div>
          <div className="ml-2 text-sm">
              <label htmlFor="helper-radio-4" className="font-medium text-gray-900 ">
                <div>{elm.name}</div>
                <div className="flex space-x-2">
                <p id="helper-radio-text-4" className="text-xs font-normal text-gray-500">{elm.address}</p>
                <p id="helper-radio-text-4" className="text-xs font-normal text-gray-500">{elm.country}</p>
                </div>
                <p id="helper-radio-text-4" className="text-xs font-normal text-gray-500">{elm.pin}</p>
              </label>
          </div>
        </div>

          <div className="flex items-center space-x-3">


          </div>
        </div>

       
      </li>

)) : 
<div>
  <p className="text-2xl text-gray-600 ">No address available</p>
  
</div>}
    
     
    </ul>
</div>

      </div>





    {/* total */}
      <div className="mt-6 border-t border-b py-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Subtotal</p>
          <p className="font-semibold text-gray-900">${totalCartPrice}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Shipping</p>
          <p className="font-semibold text-gray-900">$8.00</p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm font-medium text-gray-900">Total</p>
        <p className="text-2xl font-semibold text-gray-900">${totalCartPrice + 8}</p>
      </div>
    </div>
    <Link to={'/myOrders'}>
    <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white" onClick={handleOrder}>Place Order</button>
    </Link>
    
  </div>
</div>

    </div>
  )
}

export default Checkout
