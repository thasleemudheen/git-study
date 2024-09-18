import React, { useEffect, useState } from 'react'
import ModalInput from './ModalInput';
import UserAddNewFunding from '../services/User/UserAddNewFunding';
import { useDispatch, useSelector } from 'react-redux';
import AxiosInstance from '../AxiosInstance';
import { clearUserDetails } from '../reduxStore/userSlice';
import ModalForDetails from './ModalForDetails';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate=useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [open, setOpen] = useState(false); 
  const [charity,setCharity]=useState([])
  const [selectedCharity, setSelectedCharity] = useState(null); 
  const [showModal,setShowModal]=useState(false)
  const [visibleItems, setVisibleItems] = useState(6); // State for the number of visible items
  // const maxItems = 6;
  // const itemsToShow =showAll?charity: charity.slice(0, maxItems);
  const userId=useSelector((state)=>state.user.userId)
  const userName=useSelector((state)=>state.user.userName)
  console.log('user detials ',userId)
  const dispatch=useDispatch()
  const handleOpenDetailM=(charityDetails)=>{
    if(userId){
      setSelectedCharity(charityDetails);
      setShowModal(true);
    }
    else{
      navigate('/login')
    }
  }

  const handleOpen = () => {
    if (userId) {
      setOpen(true);
    } else {
      window.location.href = '/login';
    }
  };  
  const handleClose = () => setOpen(false);
  const handleCloseModal=()=>setShowModal(false)
  const sumbitFormDetails=async(formData)=>{
        console.log(formData)
        try {
          const response=await UserAddNewFunding(formData,userId)
          setCharity([...charity,response.data.newFund])
          console.log(response)
        } catch (error) {
          console.log(error)
        }
  }
   const handleLogoutUser=async()=>{
        const response=await AxiosInstance.post('/logoutUser',{},{
          withCredentials:true
        })
        if(response.status===200){
           dispatch(clearUserDetails())
        } 
   }
  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Searching for:', searchTerm)
  }
  useEffect(()=>{
    const fetchOrganization=async()=>{
          const response=await AxiosInstance.get('/organizations')
           setCharity(response.data.charity)
    }
    fetchOrganization()
  },[])

  const showMoreItems = () => {
    setVisibleItems(charity.length); // Show all items
  }

  const showUserDetails=()=>{
       navigate('/dashboard')
  }
  return (
    <div className="lg:w-11/12 lg:mx-auto font-sans">
      <header className="w-full flex justify-center items-center py-5 border-b border-gray-200">
        <a href="#" className="text-2xl font-bold text-center text-gray-600 no-underline">
          CharityConnect
        </a>
        <div className="ml-auto">
        {userName ? (
          <>
            <span onClick={showUserDetails} className="text-gray-600 text-xl mr-8 font-bold">{userName}</span>
            <button onClick={handleLogoutUser}
             className="py-2 px-4 text-base bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >Logout</button>
          </>
        
        ) : (
          <a href="/login" className="text-gray-600 text-xl font-bold hover:text-gray-800">Login</a>
        )}
      </div>
      </header>

      <main>
        <section className="w-full text-center py-16 bg-gray-600 text-white">
          <div className="max-w-6xl mx-auto px-5">
            <h1 className="text-5xl mb-5">Make a Difference Today</h1>
            <p className="text-xl mb-8">Connect with charities and causes you care about. Your donation can change lives.</p>
            <form onSubmit={handleSearch} className="flex justify-center gap-2">
              <input
                type="text"
                placeholder="Search for a cause"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="py-2 px-3 text-base rounded-md w-72 text-gray-700"
              />
              <button type="submit" className="py-2 px-5 text-base bg-white text-gray-600 rounded-md cursor-pointer hover:bg-gray-100 transition-colors">Search</button>
            </form>
          </div>
        </section>

        <section className="w-full py-16 bg-gray-100">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="text-5xl mb-10 text-center text-gray-800">Featured Charities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {charity.slice(0, visibleItems).map((charity,index) => (
                <div key={index} className="bg-white rounded-lg p-5 text-center shadow-md">
                  <img
                    src={'https://adeebacharity.com//assects/images/logo/logo.png'}
                    alt={`Charity ${index} logo`}
                    className="w-24 h-24 object-contain mx-auto mb-5"
                  />
                  <h3 className="text-2xl mb-2"> {charity.organizationName}</h3>
                  <p className="mb-5">{charity.description}</p>
                  <button onClick={() => handleOpenDetailM(charity)}
                   className="py-2 px-5 text-base bg-gray-600 text-white rounded-md cursor-pointer hover:bg-gray-700 transition-colors">
                    Donate Now
                  </button>
                </div>
              ))}
            </div>
            {visibleItems < charity.length && (
              <div className="text-center mt-8">
                <button onClick={showMoreItems}
                  className="py-2 px-6 bg-gray-400 text-white font-semibold rounded-md shadow-md hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  Show More
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="w-full text-center py-16 bg-gray-600 text-white">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="text-5xl mb-5">Empowering Your Dreams Through Collective Support</h2>
            <p className="text-xl mb-8">Create your campaign effortlessly, share your story with a global audience, and watch your dreams grow through the support of family, friends, and kind-hearted strangers</p>
            <button onClick={handleOpen}
              className="py-2 px-6 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >ADD FUND RAISE  </button>
            <ModalInput showModalopen={open} handleFormSubmit={sumbitFormDetails} handleClose={handleClose}  />
           
          </div>
        </section>
      </main>
      <ModalForDetails showModal={showModal } closeModal={handleCloseModal}  details={selectedCharity}/>
      <footer className="w-full bg-white">
        <div className="max-w-6xl mx-auto px-5 flex justify-between items-center py-5 border-t border-gray-200">
          <p className="text-sm text-gray-600">© 2023 CharityConnect. All rights reserved.</p>
          <nav className="flex gap-5">
            <a href="#" className="text-sm text-gray-700 no-underline hover:text-gray-900 transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-gray-700 no-underline hover:text-gray-900 transition-colors">Privacy</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}