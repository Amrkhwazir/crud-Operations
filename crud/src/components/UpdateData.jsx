import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateData = () => {

    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    const [desc, setDesc] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();
    // console.log(id);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(title, desc);
        try {
            const response = await axios.put(`api/post/${id}`, {title, desc, status});
            // console.log(response);
            navigate("/")

            
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div class="h-screen w-full overflow-y-scroll flex items-start pt-2 px-2 md:pt-8 md:px-20 justify-center bg-slate-200 font-sans">
	<form action="" onSubmit={handleSubmit} className='bg-white flex flex-col gap-5 rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg '>
    <div>
            <h1 className='font-semibold text-center text-xl'>Update Details</h1>
        </div>
        <div className='flex flex-col gap-2'>
        <label>Title</label>
        <input className='rounded border-2 p-2 w-full focus:outline-blue-900' type='text' name='title' placeholder='Enter your Title' required onChange={e => setTitle(e.target.value)} />
        </div>
        <div className='flex flex-col gap-2'>
        <label>Status</label>
        <input className='rounded border-2 p-2 w-full focus:outline-blue-900' type='text' name='title' placeholder='Enter Status' required onChange={e => setStatus(e.target.value)} />
        </div>
        <div className='flex flex-col gap-2'>
        <label>Description</label>
        <textarea className='rounded border-2 p-2 focus:outline-blue-900' rows={6} cols={8} type='text' name='desc' placeholder='write something...' required onChange={e => setDesc(e.target.value)} />
        <div className='bg-blue-900 text-white w-24 p-2 text-center mt-4'>
            <button>Update</button>
        </div>
        </div>
    </form>
</div>
  )
}

export default UpdateData