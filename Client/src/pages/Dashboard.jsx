import React from 'react'
import { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import Sidebar from '../components/Sidebar';
import AiGenerator from './AiGenerator';

const Dashboard = () => {
  return (
    <>
      <div>

      </div>
      <div className="flex">
        <Sidebar />
        <div className="ml-64 flex-1 bg-black text-white min-h-screen p-6">
          <Routes>
            <Route path='/dashboard/ai-generator' element={<AiGenerator/>}></Route>
          </Routes>
        </div>
      </div>
    </>

  )
}

export default Dashboard