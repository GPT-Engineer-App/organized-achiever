import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";

const Index = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Sample Task 1", description: "This is a sample task", dueDate: new Date() },
    { id: 2, title: "Sample Task 2", description: "This is another sample task", dueDate: new Date() },
  ]);
  const [taskForm, setTaskForm] = useState({ id: null, title: "", description: "", dueDate: "" });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskForm({ ...taskForm, [name]: value });
  };

  const handleAddTask = () => {
    const newTask = { ...taskForm, id: tasks.length + 1, dueDate: new Date(taskForm.dueDate) };
    setTasks([...tasks, newTask]);
    setTaskForm({ id: null, title: "", description: "", dueDate: "" });
  };

  const handleEditTask = (task) => {
    setTaskForm({ ...task, dueDate: format(task.dueDate, "yyyy-MM-dd") });
    setIsEditing(true);
  };

  const handleUpdateTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskForm.id ? { ...taskForm, dueDate: new Date(taskForm.dueDate) } : task
    );
    setTasks(updatedTasks);
    setTaskForm({ id: null, title: "", description: "", dueDate: "" });
    setIsEditing(false);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Todo List</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Task</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Task" : "Add Task"}</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                isEditing ? handleUpdateTask() : handleAddTask();
              }}
            >
              <Input
                name="title"
                placeholder="Task Title"
                value={taskForm.title}
                onChange={handleInputChange}
                required
              />
              <Textarea
                name="description"
                placeholder="Task Description"
                value={taskForm.description}
                onChange={handleInputChange}
                required
              />
              <Input
                type="date"
                name="dueDate"
                value={taskForm.dueDate}
                onChange={handleInputChange}
                required
              />
              <Button type="submit" className="mt-4">
                {isEditing ? "Update Task" : "Add Task"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardHeader>
              <CardTitle>{task.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{task.description}</p>
              <p className="text-sm text-muted-foreground">
                Due: {format(new Date(task.dueDate), "PPP")}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => handleEditTask(task)}>
                Edit
              </Button>
              <Button variant="destructive" onClick={() => handleDeleteTask(task.id)}>
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;
