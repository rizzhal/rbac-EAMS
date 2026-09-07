

import React, { useEffect, useState } from "react";

import { Plus, UserRound, Flag } from "lucide-react";

import { Textarea } from "./ui/textarea";

import { Input } from "./ui/input";

import { Button } from "./ui/button";

import { Label } from "./ui/label";

import {

  Select,

  SelectContent,

  SelectItem,

  SelectTrigger,

  SelectValue,

} from "./ui/select";

import {

  Card,

  CardContent,

  CardDescription,

  CardHeader,

  CardTitle,

} from "./ui/card";



import { createTask, getEmployees } from "@/services/taskService";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [assigned, setAssigned] = useState("");

  const [priority, setPriority] = useState("medium");

  const [loading, setLoading] = useState(false);

  const [employees , setEmployees] = useState([]);
  const [employeesLoading , setEmployeesLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
      const fetchEmployees = async () => {
        setEmployeesLoading(true)
        try {
            const response = await getEmployees();
            console.log(response.employees)
            setEmployees(response.employees)
        } catch (error) {
          toast.error("Failed to fetch employees")
        } finally {
          setEmployeesLoading(false)
        }
      }
      fetchEmployees()
    },[])

  const handleSubmit = async (e) => {

        e.preventDefault();

    if(!assigned){
        toast.error("please select an employee")
        return
    }
    setLoading(true);
    try {

      await createTask({title, description, assigned, priority});

      toast.success("Task created successfully");

      setTitle("");

      setDescription("");

      setAssigned("");

      setPriority("medium");

      navigate("/admin-dashboard")
      

    } catch (error) {

      toast.error(

        error.response?.data?.message || "Failed to create task"

      );

    } finally {

      setLoading(false);

    }
  };

   

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Create New Task
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Assign a new task to an employee and set its priority.
          </p>
        </div>

        <Card className="border-blue-100 bg-white shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                <Plus className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold text-slate-900">
                  Task Details
                </CardTitle>
                <CardDescription className="mt-1">
                  Provide the details for the new task.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium text-slate-700">
                  Task Title
                  <span className="ml-1 text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="e.g. Prepare an Admin dashboard"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="h-11 border-slate-200 bg-white focus-visible:border-blue-500 focus-visible:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-slate-700">
                  Description
                  <span className="ml-1 text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe what needs to be completed..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={5}
                  className="resize-none border-slate-200 bg-white focus-visible:border-blue-500 focus-visible:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="assigned" className="text-sm font-medium text-slate-700">
                    Assign Employee
                    <span className="ml-1 text-red-500">*</span>
                  </Label>

                  <Select value={assigned} onValueChange={setAssigned} >
                    <SelectTrigger
                      id="assigned"
                      className="h-11 border-slate-200 bg-white focus:ring-blue-500"
                    >
                      <div className="flex items-center gap-2">
                        <UserRound className="h-4 w-4 text-slate-400" />
                        <SelectValue placeholder="Select employee" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {employeesLoading ? (
                        <SelectItem value = "loading"  >
                          loading...
                        </SelectItem>
                      ): employees.length === 0 ? (
                        <SelectItem value = "none"   >
                           No employees found
                        </SelectItem>
                      ): (
                        employees.map((employee) => (
                          <SelectItem 
                          key={employee._id}
                          value = {employee._id} >
                            {employee.name} — {employee.email}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">
                    Priority
                    <span className="ml-1 text-red-500">*</span>
                  </Label>

                  <div className="flex h-11 gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setPriority("low")}
                      className={`flex-1 border-slate-200 ${
                        priority === "low"
                          ? "border-blue-600 bg-blue-50 text-blue-600 hover:bg-blue-50 hover:text-blue-600"
                          : "text-slate-600 hover:border-blue-300 hover:text-blue-600"
                      }`}
                    >
                      <Flag className="mr-2 h-4 w-4" />
                      Low
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setPriority("medium")}
                      className={`flex-1 border-slate-200 ${
                        priority === "medium"
                          ? "border-blue-600 bg-blue-50 text-blue-600 hover:bg-blue-50 hover:text-blue-600"
                          : "text-slate-600 hover:border-blue-300 hover:text-blue-600"
                      }`}
                    >
                      <Flag className="mr-2 h-4 w-4" />
                      Medium
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setPriority("high")}
                      className={`flex-1 border-slate-200 ${
                        priority === "high"
                          ? "border-blue-600 bg-blue-50 text-blue-600 hover:bg-blue-50 hover:text-blue-600"
                          : "text-slate-600 hover:border-blue-300 hover:text-blue-600"
                      }`}
                    >
                      <Flag className="mr-2 h-4 w-4" />
                      High
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6">
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-11 w-full bg-blue-600 font-medium text-white shadow-sm hover:bg-blue-700"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  {loading ? "Creating Task..." : "Create Task"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateTask;