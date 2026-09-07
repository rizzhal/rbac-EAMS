import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

import {
  Users,
  ClipboardList,
  Plus,
  Bell,
  Search,
  CheckCircle2,
  Clock3,
  CircleDot,
  AlertCircle,
  MoreVertical
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Sidebar from "./Sidebar";


const AdminDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================= SIDEBAR ================= */}
       <Sidebar/>

      {/* ================= MAIN ================= */}
      <div className="lg:pl-64">

        {/* ================= TOP NAVBAR ================= */}
        <header className="sticky top-0 z-10 border-b bg-white">

          <div className="flex h-16 items-center justify-between px-6">

            {/* Search */}
            <div className="relative hidden w-80 md:block">

              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <Input
                placeholder="Search dashboard..."
                className="pl-10"
              />

            </div>

            <div className="ml-auto flex items-center gap-4">

              {/* Notification */}
              <Button
                variant="ghost"
                size="icon"
                className="relative"
              >
                <Bell size={20} />

                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  3
                </span>
              </Button>

              {/* User */}
              <div className="flex items-center gap-3 border-l pl-4">

                <div className="hidden text-right sm:block">
                  <p className="text-sm font-semibold text-slate-800">
                    {user?.name}
                  </p>

                  <p className="text-xs text-slate-400">
                    Administrator
                  </p>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>

              </div>

            </div>

          </div>

        </header>

        {/* ================= CONTENT ================= */}
        <main className="p-6">

          {/* Page heading */}
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                  Dashboard
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Welcome back, {user?.name}. Here's what's happening today.
              </p>
            </div>

            <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Plus size={18} />
              Create Task
            </Button>

          </div>

          {/* ================= STATS ================= */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {/* Total */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-5">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Total Tasks
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-900">
                      128
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <ClipboardList size={22} />
                  </div>

                </div>

                <p className="mt-4 text-xs text-green-600">
                  ↑ 16.2% from last month
                </p>

              </CardContent>
            </Card>

            {/* Pending */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-5">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Pending Tasks
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-900">
                      42
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                    <Clock3 size={22} />
                  </div>

                </div>

                <p className="mt-4 text-xs text-orange-500">
                  ↑ 8.4% from last month
                </p>

              </CardContent>
            </Card>

            {/* In Progress */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-5">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      In Progress
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-900">
                      53
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <CircleDot size={22} />
                  </div>

                </div>

                <p className="mt-4 text-xs text-blue-600">
                  ↑ 12.7% from last month
                </p>

              </CardContent>
            </Card>

            {/* Completed */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-5">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Completed
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-900">
                      33
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-50 text-green-600">
                    <CheckCircle2 size={22} />
                  </div>

                </div>

                <p className="mt-4 text-xs text-green-600">
                  ↑ 23.1% from last month
                </p>

              </CardContent>
            </Card>

          </div>

          {/* ================= LOWER SECTION ================= */}
          <div className="mt-6 grid gap-6 xl:grid-cols-3">

            {/* Recent Tasks */}
            <Card className="border-0 shadow-sm xl:col-span-2">

              <CardHeader>
                <div className="flex items-center justify-between">

                  <div>
                    <CardTitle>
                      Recent Tasks
                    </CardTitle>

                    <p className="mt-1 text-sm text-slate-500">
                      Recently created and updated tasks
                    </p>
                  </div>

                  <Button variant="outline" size="sm">
                    View All
                  </Button>

                </div>
              </CardHeader>

              <CardContent className="p-0">

                <div className="overflow-x-auto">

                  <table className="w-full text-sm">

                    <thead>
                      <tr className="border-y bg-slate-50 text-left text-xs uppercase text-slate-500">

                        <th className="px-6 py-3">
                          Task
                        </th>

                        <th className="px-6 py-3">
                          Priority
                        </th>

                        <th className="px-6 py-3">
                          Status
                        </th>

                        <th className="px-6 py-3">
                          Action
                        </th>

                      </tr>
                    </thead>

                    <tbody>

                      <tr className="border-b">

                        <td className="px-6 py-4">
                          <p className="font-medium text-slate-800">
                            Design Landing Page
                          </p>

                          <p className="text-xs text-slate-400">
                            Assigned to Martin
                          </p>
                        </td>

                        <td className="px-6 py-4">
                          <Badge className="bg-red-50 text-red-600 hover:bg-red-50">
                            High
                          </Badge>
                        </td>

                        <td className="px-6 py-4">
                          <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-50">
                            In Progress
                          </Badge>
                        </td>

                        <td className="px-6 py-4">
                          <Button variant="ghost" size="icon">
                            <MoreVertical size={18} />
                          </Button>
                        </td>

                      </tr>

                      <tr className="border-b">

                        <td className="px-6 py-4">
                          <p className="font-medium text-slate-800">
                            Authentication Bug
                          </p>

                          <p className="text-xs text-slate-400">
                            Assigned to John
                          </p>
                        </td>

                        <td className="px-6 py-4">
                          <Badge className="bg-orange-50 text-orange-600 hover:bg-orange-50">
                            Medium
                          </Badge>
                        </td>

                        <td className="px-6 py-4">
                          <Badge className="bg-orange-50 text-orange-600 hover:bg-orange-50">
                            Pending
                          </Badge>
                        </td>

                        <td className="px-6 py-4">
                          <Button variant="ghost" size="icon">
                            <MoreVertical size={18} />
                          </Button>
                        </td>

                      </tr>

                      <tr className="border-b">

                        <td className="px-6 py-4">
                          <p className="font-medium text-slate-800">
                            Database Optimization
                          </p>

                          <p className="text-xs text-slate-400">
                            Assigned to Alex
                          </p>
                        </td>

                        <td className="px-6 py-4">
                          <Badge className="bg-green-50 text-green-600 hover:bg-green-50">
                            Low
                          </Badge>
                        </td>

                        <td className="px-6 py-4">
                          <Badge className="bg-green-50 text-green-600 hover:bg-green-50">
                            Completed
                          </Badge>
                        </td>

                        <td className="px-6 py-4">
                          <Button variant="ghost" size="icon">
                            <MoreVertical size={18} />
                          </Button>
                        </td>

                      </tr>

                    </tbody>

                  </table>

                </div>

              </CardContent>

            </Card>

            {/* Task Summary */}
            <Card className="border-0 shadow-sm">

              <CardHeader>
                <CardTitle>
                  Task Summary
                </CardTitle>

                <p className="text-sm text-slate-500">
                  Current task distribution
                </p>
              </CardHeader>

              <CardContent>

                <div className="space-y-6">

                  <div>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-slate-600">
                        Completed
                      </span>

                      <span className="font-semibold">
                        33
                      </span>
                    </div>

                    <div className="h-2 rounded-full bg-slate-100">
                      <div className="h-2 w-[65%] rounded-full bg-green-500" />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-slate-600">
                        In Progress
                      </span>

                      <span className="font-semibold">
                        53
                      </span>
                    </div>

                    <div className="h-2 rounded-full bg-slate-100">
                      <div className="h-2 w-[80%] rounded-full bg-blue-500" />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-slate-600">
                        Pending
                      </span>

                      <span className="font-semibold">
                        42
                      </span>
                    </div>

                    <div className="h-2 rounded-full bg-slate-100">
                      <div className="h-2 w-[55%] rounded-full bg-orange-500" />
                    </div>
                  </div>

                </div>

                <div className="mt-8 rounded-lg bg-blue-50 p-4">

                  <div className="flex items-start gap-3">

                    <AlertCircle
                      size={20}
                      className="mt-0.5 text-blue-600"
                    />

                    <div>
                      <p className="text-sm font-semibold text-blue-800">
                        Task Overview
                      </p>

                      <p className="mt-1 text-xs text-blue-600">
                        Keep track of your team's current workload.
                      </p>
                    </div>

                  </div>

                </div>

              </CardContent>

            </Card>

          </div>

          {/* ================= QUICK ACTIONS ================= */}
          <div className="mt-6 grid gap-4 md:grid-cols-3">

            <Card className="border-0 shadow-sm">

              <CardContent className="flex items-center gap-4 p-5">

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Plus size={21} />
                </div>

                <div>
                  <p className="font-semibold text-slate-800">
                    Create Task
                  </p>

                  <p className="text-xs text-slate-500">
                    Assign a new task to an employee
                  </p>
                </div>

              </CardContent>

            </Card>

            <Card className="border-0 shadow-sm">

              <CardContent className="flex items-center gap-4 p-5">

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                  <Users size={21} />
                </div>

                <div>
                  <p className="font-semibold text-slate-800">
                    Employees
                  </p>

                  <p className="text-xs text-slate-500">
                    Manage your team members
                  </p>
                </div>

              </CardContent>

            </Card>

            <Card className="border-0 shadow-sm">

              <CardContent className="flex items-center gap-4 p-5">

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-50 text-green-600">
                  <CheckCircle2 size={21} />
                </div>

                <div>
                  <p className="font-semibold text-slate-800">
                    Completed Tasks
                  </p>

                  <p className="text-xs text-slate-500">
                    Review completed work
                  </p>
                </div>

              </CardContent>

            </Card>

          </div>

        </main>

      </div>

    </div>
  );
};

export default AdminDashboard;