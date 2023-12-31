import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { selectUserCartTotalItems } from '../cart/CartSlice'
import { useSelector } from 'react-redux'
import { selectCreatedUser, selectLogedInUser } from '../auth/authSlice'
import { selectUserInfo } from '../user/userSlice'




const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}



const userNavigation = [
  { name: 'My Profile', link: '/profile' },
  { name: 'My Orders', link: '/user-orders' },
  { name: 'Sign out', link: '/logout' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar({children}) {

  const userCartData = useSelector(selectUserCartTotalItems)
  const logedInUser = useSelector(selectLogedInUser);
  const loginData = localStorage.getItem('loginData')
  const userInfo = useSelector(selectUserInfo)

  const totalItems = ()=>{
    let totalCartItems = 0;
     userCartData.forEach(element => {
      if(!element.deleted){
          totalCartItems += 1;
      }
    });
    return totalCartItems;
  }
  
  
  const cartTotalItems = totalItems();


const navigation = []


if (loginData) {
  const storedObject = JSON.parse(loginData);
  if(storedObject && storedObject.role === 'admin'){
    navigation.push({ name: 'Admin', link: '/admin', current: true }, { name: 'Orders', link: '/admin/userOrders', current: true });
}else {
  navigation.push(
    { name: 'Home', link: '/', current: true },
    { name: 'About', link: '/admin', current: true },
  )
}
} 


  return (
    <>
    
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <Link to={item.link} key={item.name}>
                          <div
                            key={item.name}
                            className={classNames(
                              item.current
                                ? 'bg-gray-900 text-white cursor-pointer'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium cursor-pointer'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </div>
                          </Link>
                         
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                    
                    <Link to={'/cart'}>
                      <button
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        
                        <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                      </Link>
                        
                          <span className='h-5 w-5 p-[0.05rem] rounded-full bg-white text-red-500 text-sm relative -top-4 flex justify-center items-center'>{ cartTotalItems}</span>
                      

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            {userInfo && userInfo.photo ? 
                              <img className="h-8 w-8 rounded-full object-cover" src={userInfo.photo} alt="" /> : 
                              <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />}
                            
                            
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
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <Link to={`${item.link}`}>
                                  <li 
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </li>
                                  </Link>
                                  
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Link to={item.link} key={item.name}>
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white cursor-pointer' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium cursor-pointer'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                    </Link>
                   
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                    {userInfo && userInfo.photo ? 
                              <img className="h-8 w-8 rounded-full" src={userInfo.photo} alt="" /> : 
                              <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                              }
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{user.name}</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                    </div>
                    <Link to={'/cart'}>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      
                        <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    </Link>

                        <span className='h-5 w-5 p-[0.05rem] rounded-full bg-white text-red-500 text-sm relative -top-4 flex justify-center items-center'>{cartTotalItems}</span>
                   
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  )
}
