import { useContext, useEffect, useMemo, useState } from "react";

import {
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  ClipboardList,
  Clock3,
  LayoutDashboard,
  LogOut,
  Menu,
  MoreVertical,
  X,
} from "lucide-react";

import { AuthContext } from "@/context/AuthContext";
import { getTasks, updateTaskStatus } from "@/services/taskService";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";


const EmpDash = () => {
  const { user } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);


  // FETCH TASKS
 
 const fetchApi = async () => {
    setTasksLoading(true);

    try {
      const response = await getTasks();

      setTasks(response.tasks || []);
    } catch (error) {

      toast.error(
        error.response?.data?.message || "Failed to fetch tasks"
      );
    } finally {
      setTasksLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  // TASK COUNTS
 
  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "pending"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  // --------------------------------------------------
  // COMPLETION %
  // --------------------------------------------------

  const completionPercentage =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  // --------------------------------------------------
  // UPDATE STATUS
  // --------------------------------------------------

  const handleStatusChange = async (taskId, value) => {
    try {
      await updateTaskStatus(taskId, value);

      toast.success("Task status updated");

      fetchApi();
    } catch (error) {
      console.error("Failed to update task:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update task"
      );
    }
  };

  // --------------------------------------------------
  // RECENT TASKS
  // --------------------------------------------------

  const recentTasks = useMemo(() => {
    return [...tasks].slice(0, 5);
  }, [tasks]);

  // --------------------------------------------------
  // NAVIGATION
  // --------------------------------------------------

  const navigation = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      active: true,
    },
    
  ];

 

  // --------------------------------------------------
  // SIDEBAR
  // --------------------------------------------------

  const Sidebar = () => (
    <aside
      className={`
        fixed left-0 top-0 z-40 h-screen w-64
        border-r bg-white
        transition-transform duration-300
        lg:translate-x-0
        ${mobileMenu ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Logo */}

      <div className="flex h-16 items-center justify-between border-b px-6">
        <h1 className="text-xl font-bold">
          <a href="/"><span className="text-transparent bg-clip-text bg-linear-to-r from-blue-700 to-blue-500">EAMS</span></a>
        </h1>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobileMenu(false)}
        >
          <X size={20} />
        </Button>
      </div>

      <div className="flex h-[calc(100vh-64px)] flex-col overflow-y-auto p-4">

        {/* MAIN */}

        <div>
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Main
          </p>

          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <Button
                  key={item.title}
                  variant="ghost"
                  className={`
                    w-full justify-start gap-3
                    ${
                      item.active
                        ? "bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-600"
                        : "text-slate-600 hover:bg-slate-50"
                    }
                  `}
                >
                  <Icon size={18} />
                  {item.title}
                </Button>
              );
            })}
          </div>
         
        </div>


        {/* PROGRESS CARD */}

        <div className="mt-96 pt-8">
          <div className="rounded-xl bg-blue-600 p-5 text-white shadow-sm">

            <p className="text-sm font-semibold">
              Keep Going! 🚀
            </p>

            <p className="mt-2 text-xs text-blue-100">
              You're making great progress on your tasks.
            </p>

            <div className="mt-5 flex items-center gap-3">

              <div className="h-2 flex-1 overflow-hidden rounded-full bg-blue-400">
                <div
                  className="h-full rounded-full bg-white transition-all"
                  style={{
                    width: `${completionPercentage}%`,
                  }}
                />
              </div>

              <span className="text-xs font-semibold">
                {completionPercentage}%
              </span>

            </div>

          </div>
        </div>

      </div>
       <div className="absolute bottom-4 left-4 right-4">

          <Button 
            variant="ghost"
            className="w-full justify-start gap-3 text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={18} />
            Logout
          </Button>

        </div>
    </aside>
  );

  
  
  return (
    <div className="min-h-screen bg-slate-50">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MOBILE OVERLAY */}

      {mobileMenu && (
        <div
          className="fixed inset-0 z-30 bg-black/20 lg:hidden"
          onClick={() => setMobileMenu(false)}
        />
      )}

      {/* MAIN CONTENT */}

      <div className="lg:pl-64">

        {/* =========================================
            TOP NAVBAR
        ========================================= */}

        <header className="sticky top-0 z-20 border-b bg-white">

          <div className="flex h-16 items-center justify-between px-4 sm:px-6">

            <div className="flex items-center gap-3">

              {/* Mobile menu */}

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenu(true)}
              >
                <Menu size={21} />
              </Button>


            </div>

            <div className="flex items-center gap-3">

              {/* User */}

              <div className="flex items-center gap-3 border-l pl-3 sm:pl-4">

                <div className="hidden text-right sm:block">

                  <p className="text-sm font-semibold text-slate-800">
                    {user?.name}
                  </p>

                  <p className="text-xs text-slate-400">
                    {user?.role}
                  </p>

                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>

                <ChevronDown
                  size={15}
                  className="hidden text-slate-400 sm:block"
                />

              </div>

            </div>

          </div>
        </header>

        {/* =========================================
            PAGE
        ========================================= */}

        <main className="p-4 sm:p-6">

          {/* PAGE HEADER */}

          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h2 className="text-2xl font-bold text-slate-900">
                Dashboard
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Welcome back, {user?.name}. Here's your task overview.
              </p>

            </div>

          </div>

          {/* =========================================
              STAT CARDS
          ========================================= */}

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {/* TOTAL */}

            <Card className="border-0 shadow-sm">

              <CardContent className="p-5">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm font-medium text-slate-500">
                      My Tasks
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-900">
                      {totalTasks}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Total assigned
                    </p>

                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <ClipboardList size={21} />
                  </div>

                </div>

                {/* mini graph */}

                <div className="mt-5 flex h-8 items-end gap-1">

                  {[35, 50, 40, 65, 55, 75, 60, 85, 70, 90].map(
                    (height, index) => (
                      <div
                        key={index}
                        className="flex-1 rounded-sm bg-blue-100"
                        style={{ height: `${height}%` }}
                      />
                    )
                  )}

                </div>

              </CardContent>

            </Card>

            {/* PENDING */}

            <Card className="border-0 shadow-sm">

              <CardContent className="p-5">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm font-medium text-slate-500">
                      Pending
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-900">
                      {pendingTasks}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Tasks pending
                    </p>

                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                    <Clock3 size={21} />
                  </div>

                </div>

                <div className="mt-5 flex h-8 items-end gap-1">

                  {[30, 45, 35, 55, 45, 60, 50, 70, 55, 75].map(
                    (height, index) => (
                      <div
                        key={index}
                        className="flex-1 rounded-sm bg-orange-100"
                        style={{ height: `${height}%` }}
                      />
                    )
                  )}

                </div>

              </CardContent>

            </Card>

            {/* IN PROGRESS */}

            <Card className="border-0 shadow-sm">

              <CardContent className="p-5">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm font-medium text-slate-500">
                      In Progress
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-900">
                      {inProgressTasks}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Tasks in progress
                    </p>

                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <CircleDot size={21} />
                  </div>

                </div>

                <div className="mt-5 flex h-8 items-end gap-1">

                  {[40, 55, 45, 70, 50, 80, 65, 75, 60, 90].map(
                    (height, index) => (
                      <div
                        key={index}
                        className="flex-1 rounded-sm bg-indigo-100"
                        style={{ height: `${height}%` }}
                      />
                    )
                  )}

                </div>

              </CardContent>

            </Card>

            {/* COMPLETED */}

            <Card className="border-0 shadow-sm">

              <CardContent className="p-5">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm font-medium text-slate-500">
                      Completed
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-900">
                      {completedTasks}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Tasks completed
                    </p>

                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                    <CheckCircle2 size={21} />
                  </div>

                </div>

                <div className="mt-5 flex h-8 items-end gap-1">

                  {[30, 40, 35, 55, 45, 65, 50, 75, 65, 85].map(
                    (height, index) => (
                      <div
                        key={index}
                        className="flex-1 rounded-sm bg-green-100"
                        style={{ height: `${height}%` }}
                      />
                    )
                  )}

                </div>

              </CardContent>

            </Card>

          </div>

          {/* =========================================
              MAIN GRID
          ========================================= */}

          <div className="mt-6 grid gap-6 xl:grid-cols-3">

            {/* =====================================
                MY TASKS TABLE
            ===================================== */}

            <Card className="border-0 shadow-sm xl:col-span-2">

              <CardHeader>

                <div className="flex items-center justify-between">

                  <div>

                    <CardTitle>
                      My Tasks
                    </CardTitle>

                    <p className="mt-1 text-sm text-slate-500">
                      Tasks assigned to you by the administrator
                    </p>

                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1"
                  >
                    All Tasks
                    <ChevronDown size={14} />
                  </Button>

                </div>

              </CardHeader>

              <CardContent className="p-0">

                {tasksLoading ? (

                  <div className="px-6 py-12 text-center">
                    <p className="text-sm text-slate-500">
                      Loading tasks...
                    </p>
                  </div>

                ) : recentTasks.length === 0 ? (

                  <div className="px-6 py-12 text-center">

                    <ClipboardList
                      className="mx-auto mb-3 text-slate-300"
                      size={35}
                    />

                    <p className="font-medium text-slate-700">
                      No tasks assigned
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      Your assigned tasks will appear here.
                    </p>

                  </div>

                ) : (

                  <div className="overflow-x-auto">

                    <table className="w-full min-w-175 text-sm">

                      <thead>

                        <tr className="border-y bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">

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
                            Created
                          </th>

                          {/* <th className="px-6 py-3">
                            Action
                          </th> */}

                        </tr>

                      </thead>

                      <tbody>

                        {recentTasks.map((task) => (

                          <tr
                            key={task._id}
                            className="border-b last:border-0 hover:bg-slate-50/70"
                          >

                            {/* TASK */}

                            <td className="px-6 py-4">

                              <div className="flex items-start gap-3">

                                <div
                                  className={`
                                    mt-1 h-2.5 w-2.5 rounded-full
                                    ${
                                      task.status === "completed"
                                        ? "bg-green-500"
                                        : task.status === "in-progress"
                                        ? "bg-blue-500"
                                        : "bg-orange-500"
                                    }
                                  `}
                                />

                                <div>

                                  <p className="font-medium text-slate-800">
                                    {task.title}
                                  </p>

                                  <p className="mt-1 max-w-70 truncate text-xs text-slate-400">
                                    {task.description}
                                  </p>

                                </div>

                              </div>

                            </td>

                            {/* PRIORITY */}

                            <td className="px-6 py-4">

                              <Badge
                                className={`
                                  border
                                  ${
                                    task.priority === "high"
                                      ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-50"
                                      : task.priority === "medium"
                                      ? "border-orange-200 bg-orange-50 text-orange-600 hover:bg-orange-50"
                                      : "border-green-200 bg-green-50 text-green-600 hover:bg-green-50"
                                  }
                                `}
                              >
                                {task.priority || "Medium"}
                              </Badge>

                            </td>

                            {/* STATUS */}

                            <td className="px-6 py-4">

                              {task.status === "completed" ? (

                                <Badge className="border border-green-200 bg-green-50 text-green-600 hover:bg-green-50">
                                  Completed
                                </Badge>

                              ) : (

                                <Select
                                  value={task.status}
                                  onValueChange={(value) =>
                                    handleStatusChange(
                                      task._id,
                                      value
                                    )
                                  }
                                >

                                  <SelectTrigger className="h-8 w-31.25 border-slate-200 text-xs">

                                    <SelectValue />

                                  </SelectTrigger>

                                  <SelectContent>

                                    <SelectItem className={"text-red-500"} value="pending">
                                      Pending
                                    </SelectItem>

                                    <SelectItem className={"text-"} value="in-progress">
                                      In Progress
                                    </SelectItem>

                                    <SelectItem value="completed">
                                      Completed
                                    </SelectItem>

                                  </SelectContent>

                                </Select>

                              )}

                            </td>

                            {/* CREATED */}

                            <td className="px-6 py-4">

                              <p className="whitespace-nowrap text-xs text-slate-500">

                                {task.createdAt
                                  ? new Date(
                                      task.createdAt
                                    ).toLocaleDateString(
                                      "en-US",
                                      {
                                        month: "short",
                                        day: "2-digit",
                                        year: "numeric",
                                      }
                                    )
                                  : "—"}

                              </p>

                            </td>

                          </tr>

                        ))}

                      </tbody>

                    </table>

                  </div>

                )}

                {tasks.length > 5 && (

                  <div className="border-t px-6 py-4 text-center">

                    <Button
                      variant="link"
                      className="text-blue-600"
                    >
                      View all tasks →
                    </Button>

                  </div>

                )}

              </CardContent>

            </Card>

            {/* =====================================
                COMPLETION CARD
            ===================================== */}

            <Card className="border-0 shadow-sm">

              <CardHeader>

                <CardTitle>
                  Task Completion
                </CardTitle>

                <p className="text-sm text-slate-500">
                  Your overall progress
                </p>

              </CardHeader>

              <CardContent>

                <div className="flex justify-center py-4">

                  <div className="relative flex h-44 w-44 items-center justify-center">

                    <svg
                      className="absolute inset-0 h-full w-full -rotate-90"
                      viewBox="0 0 100 100"
                    >

                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-slate-100"
                      />

                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        className="text-blue-600"
                        strokeDasharray="251.2"
                        strokeDashoffset={
                          251.2 -
                          (251.2 * completionPercentage) /
                            100
                        }
                      />

                    </svg>

                    <div className="text-center">

                      <p className="text-3xl font-bold text-slate-800">
                        {completionPercentage}%
                      </p>

                      <p className="text-xs text-slate-400">
                        Overall
                      </p>

                    </div>

                  </div>

                </div>

                <div className="text-center">

                  <p className="font-medium text-slate-700">
                    {completionPercentage >= 70
                      ? "Great job! Keep going!"
                      : "Keep working on your tasks!"}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {completedTasks} of {totalTasks} tasks completed
                  </p>

                </div>

                {/* Breakdown */}

                <div className="mt-6 space-y-4">

                  <div>

                    <div className="mb-1 flex justify-between text-xs">

                      <span className="text-slate-500">
                        Completed
                      </span>

                      <span className="font-medium text-green-600">
                        {completedTasks}
                      </span>

                    </div>

                    <div className="h-2 rounded-full bg-slate-100">

                      <div
                        className="h-2 rounded-full bg-green-500 transition-all"
                        style={{
                          width: `${
                            totalTasks
                              ? (completedTasks /
                                  totalTasks) *
                                100
                              : 0
                          }%`,
                        }}
                      />

                    </div>

                  </div>

                  <div>

                    <div className="mb-1 flex justify-between text-xs">

                      <span className="text-slate-500">
                        In Progress
                      </span>

                      <span className="font-medium text-blue-600">
                        {inProgressTasks}
                      </span>

                    </div>

                    <div className="h-2 rounded-full bg-slate-100">

                      <div
                        className="h-2 rounded-full bg-blue-500 transition-all"
                        style={{
                          width: `${
                            totalTasks
                              ? (inProgressTasks /
                                  totalTasks) *
                                100
                              : 0
                          }%`,
                        }}
                      />

                    </div>

                  </div>

                  <div>

                    <div className="mb-1 flex justify-between text-xs">

                      <span className="text-slate-500">
                        Pending
                      </span>

                      <span className="font-medium text-orange-500">
                        {pendingTasks}
                      </span>

                    </div>

                    <div className="h-2 rounded-full bg-slate-100">

                      <div
                        className="h-2 rounded-full bg-orange-500 transition-all"
                        style={{
                          width: `${
                            totalTasks
                              ? (pendingTasks /
                                  totalTasks) *
                                100
                              : 0
                          }%`,
                        }}
                      />

                    </div>

                  </div>

                </div>

              </CardContent>

            </Card>

          </div>

          {/* =========================================
              BOTTOM SECTION
          ========================================= */}

    

          {/* =========================================
              UPCOMING / RECENT ACTIVITY
          ========================================= */}

          <div className="mt-6 grid gap-6 lg:grid-cols-2">

            {/* UPCOMING TASKS */}

            <Card className="border-0 shadow-sm">

              <CardHeader>

                <div className="flex items-center justify-between">

                  <div>

                    <CardTitle>
                      Upcoming Tasks
                    </CardTitle>

                    <p className="mt-1 text-sm text-slate-500">
                      Tasks that need your attention
                    </p>

                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                  >
                    View All
                  </Button>

                </div>

              </CardHeader>

              <CardContent>

                {tasks.filter(
                  (task) => task.status !== "completed"
                ).length === 0 ? (

                  <div className="py-8 text-center">

                    <CheckCircle2
                      className="mx-auto mb-2 text-green-500"
                      size={30}
                    />

                    <p className="font-medium text-slate-700">
                      All caught up!
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      You have no pending tasks.
                    </p>

                  </div>

                ) : (

                  <div className="space-y-4">

                    {tasks
                      .filter(
                        (task) =>
                          task.status !== "completed"
                      )
                      .slice(0, 4)
                      .map((task) => (

                        <div
                          key={task._id}
                          className="flex items-center gap-4 rounded-lg border border-slate-100 p-3"
                        >

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <ClipboardList size={18} />
                          </div>

                          <div className="min-w-0 flex-1">

                            <p className="truncate text-sm font-semibold text-slate-800">
                              {task.title}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              {task.status === "pending"
                                ? "Waiting to start"
                                : "Currently in progress"}
                            </p>

                          </div>

                          <Badge
                            className={`
                              shrink-0
                              ${
                                task.priority === "high"
                                  ? "bg-red-50 text-red-600 hover:bg-red-50"
                                  : task.priority === "medium"
                                  ? "bg-orange-50 text-orange-600 hover:bg-orange-50"
                                  : "bg-green-50 text-green-600 hover:bg-green-50"
                              }
                            `}
                          >
                            {task.priority || "Medium"}
                          </Badge>

                        </div>

                      ))}

                  </div>

                )}

              </CardContent>

            </Card>

            {/* RECENT ACTIVITY */}

            <Card className="border-0 shadow-sm">

              <CardHeader>

                <CardTitle>
                  Recent Activity
                </CardTitle>

                <p className="text-sm text-slate-500">
                  Your recent task activity
                </p>

              </CardHeader>

              <CardContent>

                <div className="space-y-5">

                  {completedTasks > 0 && (

                    <div className="flex gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
                        <CheckCircle2 size={17} />
                      </div>

                      <div className="flex-1">

                        <p className="text-sm text-slate-700">
                          You completed a task
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {completedTasks} completed task
                          {completedTasks !== 1
                            ? "s"
                            : ""}
                        </p>

                      </div>

                      <span className="text-xs text-slate-400">
                        Recent
                      </span>

                    </div>

                  )}

                  {inProgressTasks > 0 && (

                    <div className="flex gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <CircleDot size={17} />
                      </div>

                      <div className="flex-1">

                        <p className="text-sm text-slate-700">
                          You have tasks in progress
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {inProgressTasks} task
                          {inProgressTasks !== 1
                            ? "s"
                            : ""}{" "}
                          currently being worked on
                        </p>

                      </div>

                    </div>

                  )}

                  {pendingTasks > 0 && (

                    <div className="flex gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                        <Clock3 size={17} />
                      </div>

                      <div className="flex-1">

                        <p className="text-sm text-slate-700">
                          New tasks are waiting
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {pendingTasks} pending task
                          {pendingTasks !== 1
                            ? "s"
                            : ""}
                        </p>

                      </div>

                    </div>

                  )}

                  {totalTasks === 0 && (

                    <div className="py-8 text-center">

                      <p className="text-sm text-slate-500">
                        No activity yet.
                      </p>

                    </div>

                  )}

                </div>

              </CardContent>

            </Card>

          </div>

        </main>
      </div>
    </div>
  );
};

export default EmpDash;