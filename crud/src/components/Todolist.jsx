import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const Todolist = () => {
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const fileInputRef = useRef(null);
    const filter = ["All" ,"Todo", "Progress", "Done"]
    const user =JSON.parse(localStorage.getItem('myUser')) ;

    const timestamp = "2024-05-04T09:58:30.932Z";
const date = new Date(timestamp);

// Convert UTC time to local time
const localDate = date.toLocaleString();

useEffect(() => {
    // Load data from localStorage when component mounts
    const storedData = localStorage.getItem('myData');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    // Store data to localStorage whenever data changes
    localStorage.setItem('myData', JSON.stringify(data));
  }, [data]);




   
    const handleFilters = (e) => {
        const value = e.target.value;
   
        setFilters({
          ...filters,
          [e.target.name]: value,
        });
      };

    useEffect(()=>{
        const getData = async () => {
            try {
                const response = await axios.get("api/post/");
     
                setData(response.data)
            } catch (error) {
                console.log(error);
            }

        }
        getData();
    },[]);



// // delete func
    const deleteHandler = async (id) => {
        try {
            const response = await axios.delete(`api/post/${id}`);
        
            window.location.reload();
            
        } catch (error) {
            console.log(error);
        }
    };


    // logoutHandler

    const logoutHandler = () => {
      localStorage.removeItem("myUser");
    }


    // search filter

    const handleSearch = (e) => {
  
      const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  
    const filtered = data.filter(item =>
      searchTerm.trim() === '' || item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredData(filtered)
    };


   
// profile click
    const handleProfilePicClick = () => {
      fileInputRef.current.click();
    };


  // pic uploading  
const handleChange = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    setImage(file);
    setImageUrl(reader.result);
    localStorage.setItem("uploadedImage", reader.result);
  };

  if (file) {
    reader.readAsDataURL(file);
  };

};

const imageLink = localStorage.getItem("uploadedImage");
   
  return (
    <div class="h-screen overflow-y-scroll w-full relative flex items-start pt-24 px-4 justify-center bg-slate-200 font-sans">
      <div className='bg-transparent flex justify-between  px-5 md:px-10 lg:px-20 w-full h-24 absolute top-0'>
        <div className=' w-20 md:w-32 h-20' >
          <div className='bg-black w-14 md:w-16 lg:w-16 h-14 md:h-16 lg:h-16 mt-3 md:mt-1 lg:mt-1 rounded-full'>
          <input type="file" accept="jpg, png, jpeg" ref={fileInputRef} onChange={handleChange} className='hidden' />
         {user ? <img src={imageLink} alt="" onClick={handleProfilePicClick} className='w-full h-full rounded-full' /> : ""} 
          </div>
        </div>
        {user ? (
            <div className=' w-32 md:w-48 flex gap-2 justify-around items-center lg:w-72 h-20 text-sm' >
              <p>{user?.username?.toUpperCase()} </p>
            <Link to={"/signin"} onClick={logoutHandler}><button className='bg-blue-900 text-white h-10 px-2 md:px-4 lg:px-6' >Logout</button></Link>
          </div>
        ) : (
          <div className=' w-32 md:w-48 flex gap-1 justify-around items-center lg:w-72 h-20 text-sm' >
          <Link to={"/signup"}><button className='bg-blue-900 text-white h-10 px-2  md:px-4 lg:px-6'>Register</button></Link>
          <Link to={"/signin"}><button className='bg-blue-900 text-white h-10 px-2 md:px-4 lg:px-6' >Sign in</button></Link>
        </div>
        ) }
       
      </div>
	<div class="bg-white rounded shadow p-6 m-4 w-[300px] md:w-2/3 lg:w-2/4">
        <div class="mb-4 flex justify-between">
            <h1 className='mt-0 sm:mt-0 md:mt-2 lg:mt-2 font-semibold text-base'>Todo List</h1>
            <div> 
            <input
            className='w-24 md:w-64 lg:w-80 p-1 md:p-1 text-sm mt-0 md:mt-1 border-2 rounded border-gray-400 focus:outline-none'
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      /></div>
            <div class="flex">
              {
                user ? (  <Link to="/addformdata"><button class="flex p-1 sm:p-2 md:p-1 lg:px-2 lg-p-2 mt-0 md:mt-1 text-sm sm:text-sm md:text-base lg:text-lg border-2 border-blue-800 rounded text-white bg-blue-800">Add +</button></Link>) : (
                  <Link to="/signup"><button class="flex p-1 sm:p-2 md:p-1 lg:px-2 lg-p-2 mt-0 md:mt-1 text-sm sm:text-sm md:text-base lg:text-lg border-2 border-blue-800 rounded text-white bg-blue-800">Add +</button></Link>
                )
              } 
            
            </div>
        </div>
        <div>
            <div class="flex justify-between mb-3 items-center  text-sm md:text-base lg:text-lg">
                <h1 class="w-16 md:w-20 lg:w-32  font-semibold">Title</h1>
                <h1 class="w-24 md:w-32 lg:w-48  ml-2  lg:mr-12 font-semibold">Description</h1>
                <h1 class="w-16 md:w-20 lg:w-24  lg:mr-12 font-semibold">Status</h1>
                <h1 class=" hidden md:block lg:block w-16 md:w-20 lg:w-24 lg:mr-12 font-semibold">Time</h1>
                <select name="status"  onChange={handleFilters} className='bg-white border-2 rounded py-0 md:py-1 lg:py-1 px-0 md:px-2 ml-2 md:ml-2 text-sm focus:outline-none' >
           {/* <option disabled>All</option> */}
            {filter.map((item, indx)=> (
                <option key={indx}>{item}</option>
            ))}
          </select>
            
            </div>
            <div className='h-0.5 w-full bg-gray-400 mb-4'></div>
        </div>
        <div>
                {
                    
                    filteredData.map((items, indx)=>{
                      if(filters.status == "All" || items.status === filters.status){
                        
                        return (
                          <div key={indx} class="flex mb-4 gap-2 md:gap-2 lg:gap-2 text-sm md:text-base lg:text-base">
                            <p class="text-wrap w-14 md:w-20 lg:w-28">{items.title}</p>
                            <p class="text-wrap w-20 md:w-28 lg:w-48">{items.desc}</p>
                            <p class="text-wrap w-14 md:w-18 lg:w-24">{items.status}</p>
                            <p class=" hidden md:block lg:block w-16 md:w-20 lg:w-24 text-sm ">{localDate}</p>
                            <div className='flex items-center gap-1 flex-col md:flex-row text-base'>
                              <Link to={`/${items._id}`}><button class="w-16 p-1 rounded text-white bg-emerald-400">Edit</button></Link>
                              <button class="w-16 md:w-16 lg:w-16 p-1 rounded text-white bg-red-700" onClick={e => deleteHandler(items._id)}>Remove</button>
                            </div>
                          </div>
                        );}
          
                })
                }
 
        </div>
    </div>
</div>
  )
}

export default Todolist