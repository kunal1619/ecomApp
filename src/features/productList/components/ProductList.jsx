import { useEffect, useState } from "react"
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { Fragment } from "react"
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/20/solid'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllProductsAsync, fetchPageNumberDataAsync, fetchProductByFilterAsync, selectAllProducts } from "../ProductSlice"
import { LIMIT_PAGEDATA } from "../../../app/constant"

const sortOptions = [
  { name: 'Best Rating', current: false },
  { name: 'Price: Low to High', current: false },
  { name: 'Price: High to Low', current: false },
]
//"men's clothing", 'jewelery', 'electronics', "women's clothing"
const filters = [
  {
    id: 'category',
    name: 'Category',
    options: [
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
     
      {value: 'lighting', label: 'lighting', checked: false}],
  },
 
]



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


 function ProductList() {
 
const productsList = useSelector(selectAllProducts)
const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

const dispatch = useDispatch();

const [filterByNames, setFilterByNames] = useState([])
const [filtered, setFiltered] = useState()
const [sortBy, setSortBy] = useState(1)

for (const filter of filters) {
  if (filter.id === 'category') {
    for (const option of filter.options) {
      if (filtered && filtered.category.includes(option.value)) {
        option.checked = true;
      }
    }
  }
}



const handleFilter = (e, section, option)=>{
  if(e.target.checked){
    let filteredBy = []
    filteredBy.push(option.value)
    setFilterByNames([...filterByNames,...filteredBy])
    const filterData = { [section.id] : [...filterByNames, option.value], sortby : sortBy}
    setFiltered(filterData)
    dispatch(fetchProductByFilterAsync(filterData))
  }else{
    setFilterByNames(filterByNames.filter((cat)=> cat !== option.value))
  }
  
}

const handleSort = (sortName)=>{
  if(sortName === 'Price: Low to High'){
    setSortBy(1)
    dispatch(fetchProductByFilterAsync({...filtered, sortby : 1}))
  }else if(sortName === 'Price: High to Low'){
    setSortBy(-1)
    dispatch(fetchProductByFilterAsync({...filtered, sortby : -1}))
  }
}

useEffect(()=>{
  dispatch(fetchAllProductsAsync())
},[])

  return (

    <div className="bg-white">
    <div>
      {/* Mobile filter dialog */}
<MobileFiltered mobileFiltersOpen={mobileFiltersOpen} setMobileFiltersOpen={setMobileFiltersOpen} handleFilter={handleFilter}/>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
       <DesktopFiltered handleSort={handleSort} setMobileFiltersOpen={setMobileFiltersOpen}/>
          {/* product grid start */}
         <Products productsList={productsList} handleFilter={handleFilter} sortBy={sortBy}/>

        {/* product grid end */}

        {/* pagination start */}
       {/* <Pagination dispatch={dispatch} handleSort={handleSort}/> */}

      </main>
    </div>
  </div>

//item

  
  )
}

export default ProductList;




const  MobileFiltered= ({mobileFiltersOpen, setMobileFiltersOpen, handleFilter}) => {


  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
      <Transition.Child
        as={Fragment}
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </Transition.Child>

      <div className="fixed inset-0 z-40 flex">
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Filters */}
            <form className="mt-4 border-t border-gray-200">
              <h3 className="sr-only">Categories</h3>


              {filters.map((section) => (
                <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                  {({ open }) => (
                    <>
                      <h3 className="-mx-2 -my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">{section.name}</span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon className="h-5 w-5" aria-hidden="true" />
                            ) : (
                              <PlusIcon className="h-5 w-5" aria-hidden="true" />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-6">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex items-center">
                              <input
                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                defaultValue={option.value}
                                type="checkbox"
                                defaultChecked={option.checked}
                                onClick={e => handleFilter(e, section, option)}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                className="ml-3 min-w-0 flex-1 text-gray-500"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </form>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition.Root>
  )
}




const  DesktopFiltered= ({handleSort, setMobileFiltersOpen}) => {
  
  return (
    <div>
       <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Our Products</h1>

          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <li
                            onClick={()=>handleSort(option.name)}
                            className={classNames(
                              option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            {option.name}
                          </li>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
              <span className="sr-only">View grid</span>
              <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <FunnelIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
    </div>
  )
}




const  Products = ({productsList, handleFilter}) => {
  
  const pageSize = 5; // Number of objects per page
  const numberOfTabs = Math.ceil(productsList.length / pageSize)
  
  const array = [];
  for(let i = 0; i<numberOfTabs; i++){
    array.push(i+1)
  }

  // Function to get paginated data based on page number
  const getPaginatedData = (pageNumber) => {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return productsList.slice(startIndex, endIndex);
  };
  
  // Example usage

  const [pageNumber, setPageNumber] = useState(1)
  
  const paginatedData = getPaginatedData(pageNumber)

  const handlePagination = (pageNum)=>{
     setPageNumber(pageNum)
  }

 


  return (
    <div>
              <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters */}
            <form className="hidden lg:block">
              <h3 className="sr-only">Categories</h3>
             

              {filters.map((section) => (
                <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">{section.name}</span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon className="h-5 w-5" aria-hidden="true" />
                            ) : (
                              <PlusIcon className="h-5 w-5" aria-hidden="true" />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex items-center">
                              <input
                                id={`filter-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                defaultValue={option.value}
                                type="checkbox"
                                defaultChecked={option.checked}
                                onClick={e => handleFilter(e, section, option)}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                className="ml-3 text-sm text-gray-600"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </form>

            {/* Product grid */}
            <div className="lg:col-span-3">
            {/* Your content */}
            <div className="bg-white">
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      
      <div className=" grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {paginatedData && paginatedData.map((product) => {
          if(!product.delete){
            return   <Link to={`/productdetail/${product._id}`} key={product._id}>
          <div  className="group relative" >
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-gray-700 text-sm font-semibold">
                {product.title}
                    
                </h3>
                <div className="flex items-center space-x-1">
                <StarIcon className="h-5 w-5 text-yellow-400 "/>
                <p className="mt-1 text-sm text-gray-500">{product.rating}</p>
                </div>
               
              </div>
              <p className="text-sm font-medium text-gray-900">${product.price}</p>
            </div>
          </div>
          </Link>
          }
        

        })}
      </div>
    </div>
  </div>
            </div>
          </div>
        </section>

      {/* pagination */}

      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <div onClick={()=>{pageNumber<6 ? setPageNumber(pageNumber + 1) : setPageNumber(6)}}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
        >
          Previous
        </div>
        <div onClick={()=>{pageNumber>1 ? setPageNumber(pageNumber - 1) : setPageNumber(1)}}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
        >
          Next
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
            <span className="font-medium">97</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <div  onClick={()=>{pageNumber>1 ? setPageNumber(pageNumber - 1) : setPageNumber(1)}}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer">
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            {array.map((num)=>(
              <div aria-current="page" key={num} onClick={()=>handlePagination(num)}
              className={`cursor-pointer relative z-10 inline-flex items-center ${pageNumber === num ? "bg-indigo-600 text-white" : "bg-white"}  hover:bg-indigo-600 hover:text-white text-gray-700 px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>
              {num}
            </div>
            ))}
           

            <div onClick={()=>{pageNumber<6 ? setPageNumber(pageNumber + 1) : setPageNumber(6)}}  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer">
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
    </div>
  )
}


