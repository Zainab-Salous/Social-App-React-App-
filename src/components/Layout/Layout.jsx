import React from 'react'
import  { AppNav } from './Navbar/Navbar'
import  AppFooter  from './Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <main className='dark:bg-gray-900 dark:text-gray-100'>
      <AppNav />
      <div className='min-h-screen'>

      <Outlet/>
      </div>
      <AppFooter/>
    </main>
  )
}
