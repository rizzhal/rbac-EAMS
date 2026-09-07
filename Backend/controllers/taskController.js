import User from "../models/UserSchema.js"
import Task from "../models/taskSchema.js"
import checkAccess from "../services/accessControl.js"

export const createTask = async (req , res) => {
    try {
        const {title, description, assigned, priority  } = req.body
        if(!title || !description || !assigned){
            return res.status(400).json({message: "Please provide task details"});
        }
        const employee = await User.findById(assigned)
        if(!employee){
            return res.status(404).json({ message: "Employee not found"})
        }
        if(employee.role !== "employee"){
            return res.status(400).json({ message: "Task can only be assigned to employee" })
        }
        const task = new Task({
            title,
            description,
            assigned,
            priority,
            createdBy: req.user.userId
        })

        await task.save();
        return res.status(201).json({message: "Task created successfully"})

    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: "Internal server error"})
    }
}

export const getTaskById = async (req , res) => {
    try {
        const task = await Task.findById(req.params.id);
        if(!task){
            return res.status(404).json({ message: "Task not found" })
        }
        const allowed = checkAccess({
            user: req.user,
            action: "VIEW_TASK",
            task
        });

        if(!allowed){
            return res.status(403).json({message:"You are not allowed to view the task"})
        }

        return res.status(200).json({ task })

    } catch (error) {
        console.error(error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      assigned: req.user.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      tasks,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateTask = async (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                message: "Status is required"
            });
        }

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        const allowed = checkAccess({
            user: req.user,
            action: "UPDATE_TASK",
            task
        });

        if (!allowed) {
            return res.status(403).json({
                message: "You are not allowed to update this task"
            });
        }

        task.status = status;

        await task.save();

        return res.status(200).json({
            message: "Task status updated successfully",
            task
        });

    } catch (error) {
        console.error(error.mstatusessage);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export const getEmployees = async (req , res) => {
    try {
        const employees = await User.find({
            role: "employee"
        }).select("-password")

        if(employees.length === 0){
            return res.status(404).json({message: "Employee not found"})
        }
        return res.status(201).json({employees})
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
}
