import { useContext, useEffect, useMemo, useState } from "react";

import {
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  ClipboardList,
  Clock3,
  Folder,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  MoreVertical,
  Search,
  Settings,
  UserRound,
  Users,
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
import { Input } from "@/components/ui/input";

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
      console.error("Failed to fetch tasks:", error);

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
    {
      title: "My Tasks",
      icon: ClipboardList,
    },
    {
      title: "Calendar",
      icon: CalendarDays,
    },
    {
      title: "My Projects",
      icon: Folder,
    },
    {
      title: "Completed Tasks",
      icon: CheckCircle2,
    },
  ];

  const analytics = [
    {
      title: "Performance",
      icon: CircleDot,
    },
    {
      title: "Reports",
      icon: ClipboardList,
    },
  ];

  const communication = [
    {
      title: "Messages",
      icon: Users,
    },
    {
      title: "Announcements",
      icon: Bell,
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
          <span className="text-blue-600">Task</span>
          <span className="text-slate-700">Flow</span>
        </h1>

        <span className="text-sm font-medium text-slate-400">
          Employee
        </span>

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

        {/* ANALYTICS */}

        <div className="mt-8">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Analytics
          </p>

          <div className="space-y-1">
            {analytics.map((item) => {
              const Icon = item.icon;

              return (
                <Button
                  key={item.title}
                  variant="ghost"
                  className="w-full justify-start gap-3 text-slate-600 hover:bg-slate-50"
                >
                  <Icon size={18} />
                  {item.title}
                </Button>
              );
            })}
          </div>
        </div>

        {/* COMMUNICATION */}

        <div className="mt-8">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Communication
          </p>

          <div className="space-y-1">
            {communication.map((item) => {
              const Icon = item.icon;

              return (
                <Button
                  key={item.title}
                  variant="ghost"
                  className="w-full justify-between text-slate-600 hover:bg-slate-50"
                >
                  <span className="flex items-center gap-3">
                    <Icon size={18} />
                    {item.title}
                  </span>

                  {item.title === "Messages" && (
                    <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100">
                      2
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>
        </div>

        {/* SETTINGS */}

        <div className="mt-8">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Settings
          </p>

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-slate-600 hover:bg-slate-50"
          >
            <UserRound size={18} />
            Profile
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-slate-600 hover:bg-slate-50"
          >
            <Settings size={18} />
            Settings
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-slate-600 hover:bg-slate-50"
          >
            <HelpCircle size={18} />
            Help & Support
          </Button>
        </div>

        {/* PROGRESS CARD */}

        <div className="mt-auto pt-8">
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

              {/* Search */}

              <div className="relative hidden w-72 md:block lg:w-96">

                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <Input
                  placeholder="Search tasks, projects..."
                  className="border-slate-200 bg-slate-50 pl-10"
                />

              </div>

            </div>

            <div className="flex items-center gap-3">

              {/* Notification */}

              <Button
                variant="ghost"
                size="icon"
                className="relative"
              >
                <Bell size={19} />

                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] text-white">
                  3
                </span>
              </Button>

              {/* User */}

              <div className="flex items-center gap-3 border-l pl-3 sm:pl-4">

                <div className="hidden text-right sm:block">

                  <p className="text-sm font-semibold text-slate-800">
                    {user?.name}
                  </p>

                  <p className="text-xs text-slate-400">
                    Employee
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

            <Button
              variant="outline"
              className="w-fit gap-2"
            >
              <CalendarDays size={17} />
              This Week
              <ChevronDown size={15} />
            </Button>

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

                    <table className="w-full min-w-[700px] text-sm">

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

                          <th className="px-6 py-3">
                            Action
                          </th>

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

                                  <p className="mt-1 max-w-[280px] truncate text-xs text-slate-400">
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

                                  <SelectTrigger className="h-8 w-[125px] border-slate-200 text-xs">

                                    <SelectValue />

                                  </SelectTrigger>

                                  <SelectContent>

                                    <SelectItem value="pending">
                                      Pending
                                    </SelectItem>

                                    <SelectItem value="in-progress">
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

                            {/* ACTION */}

                            <td className="px-6 py-4">

                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <MoreVertical size={17} />
                              </Button>

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

          <div className="mt-6 grid gap-6 lg:grid-cols-2">

            {/* TASK OVERVIEW */}

            <Card className="border-0 shadow-sm">

              <CardHeader>

                <div className="flex items-center justify-between">

                  <div>

                    <CardTitle>
                      Task Overview
                    </CardTitle>

                    <p className="mt-1 text-sm text-slate-500">
                      Your current workload
                    </p>

                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                  >
                    This Week
                  </Button>

                </div>

              </CardHeader>

              <CardContent>

                <div className="flex h-52 items-end gap-3">

                  {[
                    {
                      day: "Mon",
                      value: 35,
                    },
                    {
                      day: "Tue",
                      value: 55,
                    },
                    {
                      day: "Wed",
                      value: 70,
                    },
                    {
                      day: "Thu",
                      value: 50,
                    },
                    {
                      day: "Fri",
                      value: 80,
                    },
                    {
                      day: "Sat",
                      value: 60,
                    },
                    {
                      day: "Sun",
                      value: 45,
                    },
                  ].map((item) => (

                    <div
                      key={item.day}
                      className="flex flex-1 flex-col items-center gap-2"
                    >

                      <div className="flex h-40 w-full items-end justify-center">

                        <div
                          className="w-5 rounded-t-md bg-blue-500 transition-all hover:bg-blue-600"
                          style={{
                            height: `${item.value}%`,
                          }}
                        />

                      </div>

                      <span className="text-xs text-slate-400">
                        {item.day}
                      </span>

                    </div>

                  ))}

                </div>

                <div className="mt-5 flex flex-wrap items-center gap-5 text-xs">

                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                    <span className="text-slate-500">
                      Task activity
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                    <span className="text-slate-500">
                      Completed
                    </span>
                  </div>

                </div>

              </CardContent>

            </Card>

            {/* PERFORMANCE */}

            <Card className="border-0 shadow-sm">

              <CardHeader>

                <div className="flex items-center justify-between">

                  <div>

                    <CardTitle>
                      My Performance
                    </CardTitle>

                    <p className="mt-1 text-sm text-slate-500">
                      Your task performance
                    </p>

                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                  >
                    This Month
                  </Button>

                </div>

              </CardHeader>

              <CardContent>

                <div className="flex justify-center">

                  <div className="relative flex h-36 w-64 items-center justify-center overflow-hidden">

                    <svg
                      className="absolute h-full w-full"
                      viewBox="0 0 200 100"
                    >

                      <path
                        d="M 25 90 A 75 75 0 0 1 175 90"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="14"
                        strokeLinecap="round"
                        className="text-slate-100"
                      />

                      <path
                        d="M 25 90 A 75 75 0 0 1 175 90"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="14"
                        strokeLinecap="round"
                        className="text-blue-600"
                        strokeDasharray="235"
                        strokeDashoffset={
                          235 -
                          (235 * completionPercentage) /
                            100
                        }
                      />

                    </svg>

                    <div className="mt-10 text-center">

                      <p className="text-3xl font-bold text-slate-800">
                        {completionPercentage}%
                      </p>

                      <p className="text-xs text-slate-400">
                        Performance Score
                      </p>

                    </div>

                  </div>

                </div>

                <div className="mt-4 grid grid-cols-3 divide-x">

                  <div className="text-center">

                    <p className="text-2xl font-bold text-slate-800">
                      {totalTasks}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Tasks Assigned
                    </p>

                  </div>

                  <div className="text-center">

                    <p className="text-2xl font-bold text-green-600">
                      {completedTasks}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Completed
                    </p>

                  </div>

                  <div className="text-center">

                    <p className="text-2xl font-bold text-orange-500">
                      {pendingTasks}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Pending
                    </p>

                  </div>

                </div>

              </CardContent>

            </Card>

          </div>

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