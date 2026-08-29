const accessRules = [
    {
        name: "Admin can create tasks",
        role: "admin",
        action: "CREATE_TASK",
        condition: () => true
    },

    {
        name: "Admin can assign tasks",
        role: "admin",
        action: "ASSIGN_TASK",
        condition: () => true
    },

    {
        name: "Admin can view all tasks",
        role: "admin",
        action: "VIEW_ALL_TASKS",
        condition: () => true
    },

    {
        name: "Employee can view assigned task",
        role: "employee",
        action: "VIEW_TASK",
        condition: ({ user, task }) => {
            return task.assigned.toString() === user.userId.toString();
        }
    },

    {
        name: "Employee can update assigned task",
        role: "employee",
        action: "UPDATE_TASK",
        condition: ({ user, task }) => {
            return (
                task.assigned.toString() === user.userId.toString() &&
                task.status !== "completed"
            );
        }
    }
];

export default accessRules;