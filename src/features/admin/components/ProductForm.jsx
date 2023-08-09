import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { createProductAsync, selectAllProducts } from '../../productList/ProductSlice'
import { useParams } from 'react-router-dom'
import { updateProduct } from '../../productList/ProductListApi'

const category =  [
  {value: '--category--', label: 'smartphones', checked: false},

  {value: 'smartphones', label: 'smartphones', checked: false},

  {value: 'laptops', label: 'laptops', checked: false},
 
  {value: 'fragrances', label: 'fragrances', checked: false},
  
  {value: 'skincare', label: 'skincare', checked: false},
 
  {value: 'groceries', label: 'groceries', checked: false},
 
  {value: 'home-decoration', label: 'home-decoration', checked: false},
  
  {value: 'furniture', label: 'furniture', checked: false},
  
  {value: 'tops', label: 'tops', checked: false},
  
  {value: 'womens-dresses', label: 'womens-dresses', checked: false},
  
  {value: 'womens-shoes', label: 'womens-shoes', checked: false},
   
  {value: 'mens-shirts', label: 'mens-shirts', checked: false},
 
  
  {value: 'mens-watches', label: 'mens-watches', checked: false},
  
  {value: 'womens-watches', label: 'womens-watches', checked: false},
   
  {value: 'womens-bags', label: 'womens-bags', checked: false},
  
  {value: 'womens-jewellery', label: 'womens-jewellery', checked: false},
  
  {value: 'sunglasses', label: 'sunglasses', checked: false},

  {value: 'automotive', label: 'automotive', checked: false},
  
  {value: 'motorcycle', label: 'motorcycle', checked: false},
 
  {value: 'lighting', label: 'lighting', checked: false}
]

const ProductForm = () => {

    const dispatch = useDispatch();
    const [photos, setPhotos] = useState([]);
    const products = useSelector(selectAllProducts)
    
    const handlePhotoChange = (e) => {
      const files = Array.from(e.target.files);
      const urls = files.map((file) => URL.createObjectURL(file));
      setPhotos(urls);
    };

    const {id} = useParams();

    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
      reset,
      setValue
    } = useForm()
  
    const onSubmit = (data) =>{
      if(!id){
        dispatch(createProductAsync({...data, photos}))
      }
       
       if(id){
        dispatch(updateProduct({...data, photos}))
       }
       reset()
       setPhotos([])
      }

      useEffect(()=>{
        if(id && products){
          setValue('title', products[id-1].title);
          setValue('description', products[id-1].description);
          setValue('category', products[id-1].category);
          setValue('price', products[id-1].price);
          setValue('rating', products[id-1].rating);
          setValue('highlights', products[id-1].description);
          setValue('stocks', products[id-1].stock);
          setValue('discount', products[id-1].discountPercentage);
          setPhotos(products[id-1].images);
          
        }
        
      },[])

      const handleDelete = ()=>{
        if(id){
          const product = {...products[id-1]}
          dispatch(updateProduct({...product, delete : true}))
          reset()
        }
       
      }



  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="space-y-12">
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Add new product</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          This information will be displayed publicly so be careful what you share.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
              Title
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="text"
                  name="title"
                  id="title"
                  autoComplete="username"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="janesmith"
                   {...register("title")}
                />
              </div>
            </div>
          </div>

        </div>

      </div>

      <div className="sm:col-span-3">
            <label htmlFor="rating" className="block text-sm font-medium leading-6 text-gray-900">
              Category
            </label>
            <div className="mt-2">
              <select
                id="category"
                name="category"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                 {...register("category")}
              >
              {category.map((item, ind)=>(
                <option key={ind}>{item.value}</option>
              ))}
               
                
              </select>
            </div>
          </div>
      
      <div>
      <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900 mb-1">
              Upload multiple photos
      </label>
      <input
        type="file"
        multiple
        onChange={handlePhotoChange}
      />
      <div className="mt-4 grid grid-cols-3 gap-4">
        {photos.map((photoUrl, index) => (
          <img
            key={index}
            src={photoUrl}
            alt={`Photo ${index}`}
            className="max-w-xs"
          />
        ))}
      </div>
    </div>

      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Details</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">Use original details.</p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
              Price
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="price"
                id="price"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                 {...register("price")}
              
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
              Discount %
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="discount"
                id="discount"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                 {...register("discount", { min: 0, max: 50 })}
               
              />
            </div>
          </div>

          <div className="sm:col-span-4">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Description(optional)
            </label>
            <div className="mt-2">
              <input
                id="description"
                name="description"
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                 {...register("description")}
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="rating" className="block text-sm font-medium leading-6 text-gray-900">
              Rating on rank 5
            </label>
            <div className="mt-2">
              <select
                id="rating"
                name="rating"
                autoComplete="country-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                 {...register("rating")}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="highlights" className="block text-sm font-medium leading-6 text-gray-900">
              Highlights
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="highlights"
                id="highlights"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                 {...register("highlights")}
              />
            </div>
          </div>


          <div className="sm:col-span-2">
            <label htmlFor="stocks" className="block text-sm font-medium leading-6 text-gray-900">
              Stocks
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="stocks"
                id="stocks"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                 {...register("stocks")}
              />
            </div>
          </div>
        </div>
      </div>


    </div>

    <div className="mt-6 flex items-center justify-end gap-x-6">
      <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
        Cancel
      </button>
      <button
        type="submit"
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Save
      </button>
      <button
        type="submit"
        className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  </form>
  )
}

export default ProductForm
