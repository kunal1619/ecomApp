import React, { useState } from "react"
import { selectUserInfo, updateUserInfoAsync } from "../userSlice"
import { useDispatch, useSelector } from "react-redux"
import { selectLogedInUser } from "../../auth/authSlice"
import { Link } from "react-router-dom"
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useForm } from "react-hook-form";



const MyProfile = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  

  const userAllInfo = useSelector(selectUserInfo)
  const logedInData = useSelector(selectLogedInUser)

  // const {orders, name, email, about, state, country, photo, addresses} = userAllInfo;

  const [imageUrl, setImageUrl] = useState('');


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [editProfile, setEditProfile] = useState(false)
  const [showEditAddress, setShowEditAddress] = useState(false)

  const handleEditProfile = ()=>{
    setEditProfile(!editProfile)
  }

  const dispatch = useDispatch();


  const onSubmit = data =>{

    if(data.hasOwnProperty('zip')){
      dispatch(updateUserInfoAsync(
        {...userAllInfo, userId : logedInData.id, userProfile : data }
       )); 
    }else if(data.hasOwnProperty('pin')){
      dispatch(updateUserInfoAsync(
        {...userAllInfo, userId : logedInData.id, addresses : [...userAllInfo.addAddress, {data}] }
       ));
    }else if(data.hasOwnProperty('pine')){
      dispatch(updateUserInfoAsync(
        {...userAllInfo, userId : logedInData.id, addresses : [...userAllInfo.addAddress, {data}] }
       ));
       handleDeleteAddress();
    } else{
      console.log('nothing called');
    }

      console.log(data);
      setEditProfile(false)
      setShowEditAddress(false)
      setShowAddAddress(false)
  } 
  
  const handleDeleteAddress = (ind)=>{
    setSelectdAdd(ind)
  }

  const handleEditAddress = (ind)=>{
    setShowEditAddress(!showEditAddress)
    setSelectdAdd(ind)
  }

  const [selectedAdd, setSelectdAdd] = useState(null)
  const [addAddress, setShowAddAddress] = useState(false);

  const handleAddAddress = ()=>{
    setShowAddAddress(!addAddress)
  }

  console.log(userAllInfo);

  return (
    <div>
      <div className="p-16">
        <div className="p-8 bg-white shadow mt-24">
          
          <div className="grid grid-cols-1 md:grid-cols-3">
            
            <div className="grid grid-cols-2 text-center order-last md:order-first mt-20 md:mt-0">
              
              <div>
                
                <p className="font-bold text-gray-700 text-xl">{userAllInfo && userAllInfo.hasOwnProperty('orders') ? userAllInfo.orders.length : '0'}</p>
                <p className="text-gray-400">Orders</p>
              </div>
              <div>
                
                <p className="font-bold text-gray-700 text-xl">{userAllInfo && userAllInfo.hasOwnProperty('addresses') ? userAllInfo.addresses.length : '0'}</p>
                <p className="text-gray-400">Addresess</p>
              </div>

            </div>
            <div className="relative">
              
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
              <button className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5" onClick={handleEditProfile}>
                
                Edit Profile
              </button>
              <Link to={'/'}>
              <button className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                Back To Home
              </button>
              </Link>
             
            </div>
          </div>
          <div className="mt-20 text-center border-b pb-12">
            
            <h1 className="text-4xl font-medium text-gray-700">
            {userAllInfo && userAllInfo.name ? userAllInfo.name : 'Your Name'}
            </h1>
            <p className="font-light text-gray-600 mt-3">{userAllInfo && userAllInfo.state ? userAllInfo.state : 'State'}, {userAllInfo && userAllInfo.country ? userAllInfo.country : 'Country'}</p>
            <p className="mt-8 text-gray-500">
            {userAllInfo && userAllInfo.about ? userAllInfo.about : 'short bio about you'}
            </p>
            
          </div>


{/* edit profile form start*/}


{editProfile && 
  <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>

          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                About
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={userAllInfo && userAllInfo.about ? userAllInfo.about : 'Short bio about you'}
                  {...register("about")}
                 
                />
              </div>

              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
            </div>

            <div className="col-span-full">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">

              <input type="file" accept=".jpg, .jpeg, .png" onChange={handleImageUpload} className="mb-4" {...register("photo")} value={userAllInfo && userAllInfo.photo ? userAllInfo.photo : ''}/>
    
              {imageUrl? 
                <img src={imageUrl} alt="user photo" className="h-20 w-20 rounded-full object-cover shadow-md"/> : 
                <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />}

               
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
            </div>

          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="full-name" className="block text-sm font-medium leading-6 text-gray-900">
                Full name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="full-name"
                  id="full-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("name")}
                  defaultValue={userAllInfo && userAllInfo.name ? userAllInfo.name : 'Your name'}
                />
              </div>
            </div>

         

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("email")}
                  defaultValue={userAllInfo && userAllInfo.email ? userAllInfo.email : 'Your email'}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  {...register("state")}
                  defaultValue={userAllInfo && userAllInfo.country ? userAllInfo.country : 'Your country'}
                >
                  <option>India</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="street-address"
                  id="street-address"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("streetAddress")}
                  defaultValue={userAllInfo && userAllInfo.streetAddress ? userAllInfo.streetAddress : 'Your adsress'}
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("city")}
                  defaultValue={userAllInfo && userAllInfo.city ? userAllInfo.city : 'Your city name'}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="region"
                  id="region"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("wonState")}
                  defaultValue={userAllInfo && userAllInfo.wonState ? userAllInfo.wonState : 'Your state name'}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("zip")}
                  defaultValue={userAllInfo && userAllInfo.zip ? userAllInfo.zip : 'Your ZIP / Postal code'}
                />
              </div>
            </div>
          </div>
        </div>


      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={()=>setEditProfile(false)}>
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
         
        >
          Save
        </button>
      </div>
    </form>
}


{/* edit profile form end*/}

{/* edit address start */}

{showEditAddress && 

<>
<p className="text-xl font-medium">Address Details</p>
<p className="text-gray-400">Add a new address or choose from existing address to place order</p>
<form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name" className="mt-4 mb-2 block text-sm font-medium">Full name</label>
      <div className="relative">
        <input type="text" id="name" name="name" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="enter your full name" {...register("name", { required: true })}
          defaultValue={userAllInfo.addresses.length > 0 ? userAllInfo.addresses[selectedAdd].name : ''}
        />
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
        <input type="text" id="email" name="email" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="your.email@gmail.com"{...register("email", { required: true })} 
          defaultValue={userAllInfo.addresses.length > 0 ? userAllInfo.addresses[selectedAdd].email : ''}
        />
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
            defaultValue={userAllInfo.addresses.length > 0 ? userAllInfo.addresses[selectedAdd].streetAddress : ''}/>
          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <img className="h-4 w-4 object-contain" src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg" alt="" />
          </div>
          {errors.streetaAddress && <span>This field is required</span>}
        </div>
        <select type="text" name="billing-state" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" {...register("state", { required: true })}
         defaultValue={userAllInfo.addresses.length > 0 ? userAllInfo.addresses[selectedAdd].state : ''}>
          <option value="State">State</option>
          <option value="State">India</option>
          <option value="State">USA</option>
          <option value="State">Srilanka</option>
        </select>
        {errors.state && <span>This field is required</span>}
        <input type="number" name="billing-zip" className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Pin code" {...register("pine", { required: true })}
           value={userAllInfo.addresses.length > 0 ? userAllInfo.addresses[selectedAdd].pine : ''}
        />
        {errors.pin && <span>This field is required</span>}
      </div>

      <div className='text-end flex items-center space-x-3'>
<button  type='button' className="mt-4 mb-8 w-1/3 rounded-md px-5 py-2 font-medium text-gray-800" onClick={()=>setShowEditAddress(false)}>cancel</button>
<button  type='submit' className="mt-4 mb-8 w-1/3 rounded-md bg-gray-800 px-5 py-2 font-medium text-white">ADD</button>
</div>

      </form>
</>
 
}

{/* edit address end */}


{/* add address start */}

{addAddress && 

<>
<p className="text-xl font-medium">Add a new address</p>
<form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name" className="mt-4 mb-2 block text-sm font-medium">Full name</label>
      <div className="relative">
        <input type="text" id="name" name="name" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="enter your full name" {...register("name", { required: true })}
          
        />
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
        <input type="text" id="email" name="email" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="your.email@gmail.com"{...register("email", { required: true })} 
          
        />
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
        <select type="text" name="billing-state" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" {...register("state", { required: true })}
         >
          <option value="State">State</option>
          <option value="State">India</option>
          <option value="State">USA</option>
          <option value="State">Srilanka</option>
        </select>
        {errors.state && <span>This field is required</span>}
        <input type="number" name="billing-zip" className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Pin code" {...register("pin", { required: true })}
        />
        {errors.pin && <span>This field is required</span>}
      </div>

      <div className='text-end flex items-center space-x-3'>
<button  type='button' className="mt-4 mb-8 w-1/3 rounded-md px-5 py-2 font-medium text-gray-800" onClick={()=>setShowAddAddress(false)}>cancel</button>
<button  type='submit' className="mt-4 mb-8 w-1/3 rounded-md bg-gray-800 px-5 py-2 font-medium text-white">ADD</button>
</div>

      </form>
</>
 
}

{/* add address end */}

          <div className="mt-12 flex flex-col justify-center">

      <label htmlFor="billing-address" className="mt-4 mb-2 block text-lg font-medium">Existing addresess</label>
      <div className='w-full h-auto bg-white border border-gray-200 rounded-md shadow-sm'>


{/* <!-- Dropdown menu --> */}
<div  className=" bg-white divide-y divide-gray-100 rounded-lg  ">
    <ul className="p-3 space-y-1 text-sm text-gray-700" >
{userAllInfo && userAllInfo.hasOwnProperty('addresses')  ? userAllInfo.addresses.map((elm, ind)=> (
  <li>
        <div className="flex justify-between  items-center p-2 rounded hover:bg-gray-100 ">
        <div className="flex justify-between">
        <div className="flex items-center h-5">
              <input id="helper-radio-4" name="helper-radio" type="radio" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "/>
          </div>
          <div className="ml-2 text-sm">
              <label htmlFor="helper-radio-4" className="font-medium text-gray-900 ">
                <div>{elm.state}</div>
                <p id="helper-radio-text-4" className="text-xs font-normal text-gray-500">{elm.state}</p>
                <p id="helper-radio-text-4" className="text-xs font-normal text-gray-500">{elm.pin || elm.pine}</p>
              </label>
          </div>
        </div>

          <div className="flex items-center space-x-3">

            <div className="h-6 w-6 cursor-pointer hover:scale-105 duration-150" onClick={()=>handleEditAddress(ind)}>
            <img src="./assets/edit.svg" alt="" />
            </div>

            <div className="w-12 h-12 cursor-pointer hover:scale-105 duration-150 hover:bg-amber-400 hover:text-white rounded-full p-3" onClick={(ind)=>handleDeleteAddress(ind)}>
           <img src="./assets/delete.svg" alt="" />

            </div>

          </div>
        </div>
       
      </li>

)) : 
<div>
  <p className="text-2xl text-gray-600 ">No address available</p>
  <button className="bg-blue-600 py-1 px-3 rounded-md text-white shadow-sm hover:shadow-md hover:translate-y-1 duration-100" onClick={handleAddAddress}>Add address</button>
</div>}
    
     
    </ul>
</div>

          </div>
        </div>
      </div>
    </div>
    </div>
  )
}


export default MyProfile
