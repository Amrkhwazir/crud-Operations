import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Todolist = () => {
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const filter = ["All" ,"Todo", "Progress", "Done"]
    const user =JSON.parse(localStorage.getItem('myUser')) ;

    console.log(user);

    const handleFilters = (e) => {
        const value = e.target.value;
        // console.log(value);
        setFilters({
          ...filters,
          [e.target.name]: value,
        });
      };
    // console.log(filters);
    useEffect(()=>{
        const getData = async () => {
            try {
                const response = await axios.get("api/post/");
                // console.log(response.data);
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
            // console.log(response);
            window.location.reload();
            
        } catch (error) {
            console.log(error);
        }
    };


    // search filter

    const handleSearch = (e) => {
  
      setSearchQuery(e.target.value);
  
      const filtered = data.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
  
      setFilteredData(filtered);
     
    };
   
  return (
    <div class="h-screen overflow-y-scroll w-full relative flex items-start pt-24 px-4 justify-center bg-slate-200 font-sans">
      <div className='bg-transparent flex justify-between  px-5 md:px-10 lg:px-20 w-full h-24 absolute top-0'>
        <div className=' w-20 md:w-32 h-20' >
          <div className='bg-black w-14 md:w-16 lg:w-16 h-14 md:h-16 lg:h-16 mt-3 md:mt-1 lg:mt-1 rounded-full'></div>
        </div>
        {user ? (
            <div className=' w-32 md:w-48 flex gap-2 justify-around items-center lg:w-72 h-20 text-sm' >
              <p>{user.username} </p>
            <Link to={"/signin"}><button className='bg-blue-900 text-white h-10 px-2 md:px-4 lg:px-6' >Logout</button></Link>
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
        value={searchQuery}
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
            <div class="flex justify-around mb-3 items-center text-sm md:text-base lg:text-lg">
                <h1 class="w-16 md:w-24 lg:w-32 font-semibold">Title</h1>
                <h1 class="w-24 md:w-32 lg:w-56 font-semibold">Description</h1>
                <h1 class="w-16 md:w-20 lg:w-24 font-semibold">Status</h1>
                <select name="status"  onChange={handleFilters} className='bg-white border-2 rounded py-2 px-0 md:px-3 ml-0 md:ml-20 text-sm focus:outline-none' >
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
                      // console.log(items);
                      
                      if (filters.status == "All" || items.status === filters.status) {
                        return (
                          
                          <div key={indx} class="flex mb-4 gap-2 md:gap-4 lg:gap-6 text-sm md:text-md lg:text-lg">
                            <p class="text-wrap w-14 md:w-20 lg:w-28">{items.title}</p>
                            <p class="text-wrap w-20 md:w-28 lg:w-48">{items.desc}</p>
                            <p class="text-wrap w-14 md:w-18 lg:w-24">{items.status}</p>
                            <div className='flex items-center gap-2 flex-col md:flex-row'>
                              <Link to={`/${items._id}`}><button class="w-16 p-2 rounded text-white bg-emerald-400">Edit</button></Link>
                              <button class="w-16 md:w-16 lg:w-20 p-2 rounded text-white bg-red-700" onClick={e => deleteHandler(items._id)}>Remove</button>
                            </div>
                          </div>
                        );
                      } 
                })
                }
 
        </div>
    </div>
</div>
  )
}

export default Todolist