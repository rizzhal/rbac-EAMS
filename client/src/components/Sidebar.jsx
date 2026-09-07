import React from 'react'
import { Button } from './ui/button'
import { ClipboardList, LayoutDashboard, LogOut, Plus, Settings, Users } from 'lucide-react'

const Sidebar = () => {
  return (
     <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r bg-white lg:block">

        {/* Logo */}
        <div className="flex h-16 items-center border-b px-6">
          <h1 className="text-2xl font-bold">
            <span className="text-blue-600">Task</span>
            <span className="text-slate-700">Flow</span>
          </h1>

          <span className="ml-2 text-sm font-medium text-slate-400">
            Admin
          </span>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 p-4">

          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Main
          </p>

          <Button
            variant="secondary"
            className="w-full justify-start gap-3 bg-blue-50 text-blue-600 hover:bg-blue-100"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-slate-600"
          >
            <Users size={18} />
            Employees
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-slate-600"
          >
            <ClipboardList size={18} />
            Tasks
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-slate-600"
          >
            <Plus size={18} />
            Create Task
          </Button>

          <p className="mb-3 mt-8 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            System
          </p>

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-slate-600"
          >
            <Settings size={18} />
            Settings
          </Button>

        </nav>

        {/* Bottom */}
        <div className="absolute bottom-4 left-4 right-4">

          <div className="mb-3 rounded-lg bg-blue-50 p-4">
            <p className="text-sm font-medium text-slate-700">
              TaskFlow Admin
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Manage your team's tasks
            </p>
          </div>

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={18} />
            Logout
          </Button>

        </div>
      </aside>
  )
}

export default Sidebar