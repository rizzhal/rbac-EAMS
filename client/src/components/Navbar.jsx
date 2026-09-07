
import { AuthContext } from '@/context/AuthContext'
import { logout } from '@/services/authService'
import { BookOpen, LayoutDashboard, LogOutIcon, Settings2 } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Navbar = () => {

  const { user } = useContext(AuthContext)

  const [loggedIn, setLoggedin] = useState(false)

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      setLoggedin(false)
      navigate("/login")
    } catch (error) {
      toast.error(error.response?.data?.message || "Error logging out")
    }
  }

  useEffect(() => {
    if (!user) {
      setLoggedin(false)
    }
    setLoggedin(true)
  }, [])

  return (

    <nav className="bg-neutral-primary fixed w-full z-20 top-0 inset-s-0 border-b border-default">
      <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl 
        text-transparent bg-clip-text bg-linear-to-r from-blue-700 to-blue-500
        text-heading font-bold whitespace-nowrap">EAMS</span>
        </a>
        <button data-collapse-toggle="navbar-multi-level-dropdown" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary" aria-controls="navbar-multi-level-dropdown" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" /></svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-multi-level-dropdown">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-neutral-primary">
            <li>
              <a href="/" className="block py-2 px-3 bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0" aria-current="page">Home</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">Dashboard</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">Pricing</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">Contact</a>
            </li>


            {loggedIn ? (
              <div className="relative group">
                {/* Profile section */}
                <div className="flex items-center gap-3 border-l pl-4 cursor-pointer">
                  <div className="hidden text-right sm:block">
                    <p className="text-sm font-semibold text-slate-800">
                      {user?.name}
                    </p>

                    <p className="text-xs text-slate-400">
                      {user?.role === "employee" ? "Employee" : "Administrator"}
                    </p>
                  </div>

                  {/* Profile avatar */}
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                </div>

                {/* Dropdown */}
                <div
                  className="
                          absolute right-0 top-12 z-50
                           w-80
                            rounded-2xl
                            border border-slate-200
                            bg-white
                            shadow-xl

                            opacity-0
                            invisible
                            translate-y-2
                            scale-95

                            group-hover:visible
                            group-hover:opacity-100
                            group-hover:translate-y-0
                            group-hover:scale-100

                            transition-all duration-200
                            origin-top-right
                                            "
                >
                  {/* User information */}
                  <div className="px-5 py-4">
                    <div className="flex items-center gap-3">

                      {/* Avatar */}
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-600">
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <p className="font-semibold text-slate-800">
                          {user?.name}
                        </p>

                        <p className="text-sm text-slate-400">
                          {user?.email}
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* Divider */}
                  <div className="mx-4 border-t border-slate-200" />

                  {/* Menu */}
                  <div className="p-2">

                    <Link
                      to={user?.role === "admin" ? "/admin-dashboard" : "/employee-dashboard"}
                      className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    >
                      <LayoutDashboard className='text-blue-500' size={18} />
                      <span>Dashboard</span>
                    </Link>

                    <Link
                      to="/"
                      className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    >
                      <BookOpen className='text-blue-500' size={18}/>
                      <span>My Tasks</span>
                    </Link>

                    <Link
                      to="/"
                      className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    >
                      <Settings2 className='text-blue-500' size={18}/>
                      <span>Settings</span>
                    </Link>

                  </div>

                  {/* Divider */}
                  <div className="mx-4 border-t border-slate-200" />

                  {/* Logout */}
                  <div className="p-2">
                    <button
                      onClick={handleLogout}
                      className="
                              flex w-full items-center gap-3
                              rounded-lg
                              px-4 py-3
                              text-red-500
                              hover:bg-red-50
                            "
                    >
                      <LogOutIcon size={18}/>
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                className="inline-flex items-center rounded bg-blue-500 px-3 py-2 text-white md:px-4 md:py-0.5"
                to="/login"
              >
                Login
              </Link>
            )}


          </ul>
        </div>
      </div>
    </nav>

  )
}

export default Navbar
