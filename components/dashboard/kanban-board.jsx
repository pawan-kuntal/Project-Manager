"use client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/lib/store";
import { useState } from "react";
import { GripVertical, Trash2 } from "lucide-react";
const statuses = ["todo", "in-progress", "review", "done"];
export function KanbanBoard({ tasks }) {
    const updateTask = useAppStore((state) => state.updateTask);
    const deleteTask = useAppStore((state) => state.deleteTask);
    const [draggedTask, setDraggedTask] = useState(null);
    const [dragOverColumn, setDragOverColumn] = useState(null);
    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };
    const handleDrop = (status) => {
        if (draggedTask && draggedTask.status !== status) {
            const updatedTask = Object.assign(Object.assign({}, draggedTask), { status, updatedAt: new Date().toISOString() });
            updateTask(updatedTask);
        }
        setDraggedTask(null);
        setDragOverColumn(null);
    };
    return (<div className="p-8 overflow-x-auto h-full">
      <div className="flex gap-6 min-w-max h-full">
        {statuses.map((status) => {
            const statusTasks = tasks.filter((t) => t.status === status);
            const isActive = dragOverColumn === status && draggedTask;
            return (<div key={status} className="w-80 flex flex-col flex-shrink-0" onDragOver={handleDragOver} onDrop={() => handleDrop(status)} onDragEnter={() => setDragOverColumn(status)} onDragLeave={() => setDragOverColumn(null)}>
              {/* Column Header */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold capitalize text-foreground">
                    {status === "in-progress" ? "In Progress" : status}
                  </h3>
                  <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full bg-primary text-primary-foreground">
                    {statusTasks.length}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {statusTasks.length === 1 ? "1 task" : `${statusTasks.length} tasks`}
                </p>
              </div>

              {/* Drop Zone */}
              <div className={`flex-1 space-y-3 rounded-lg p-4 transition-all duration-300 ease-out ${isActive ? "bg-primary/10 border-2 border-primary" : "bg-secondary/30 border-2 border-transparent"}`}>
                {statusTasks.length === 0 ? (<div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
                    Drop tasks here
                  </div>) : (statusTasks.map((task) => (<Card key={task.id} draggable onDragStart={() => setDraggedTask(task)} onDragEnd={() => setDraggedTask(null)} className={`p-4 cursor-move hover:shadow-lg transition-all duration-300 ease-out group ${(draggedTask === null || draggedTask === void 0 ? void 0 : draggedTask.id) === task.id ? "opacity-50" : ""}`}>
                      {/* Task Content */}
                      <div className="flex gap-2 items-start mb-2">
                        <GripVertical size={16} className="text-muted-foreground flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out"/>
                        <h4 className="font-medium text-sm flex-1">{task.title}</h4>
                        <button onClick={() => deleteTask(task.id)} className="p-1 hover:bg-destructive/20 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out flex-shrink-0">
                          <Trash2 size={14} className="text-destructive"/>
                        </button>
                      </div>

                      {/* Description */}
                      {task.description && (<p className="text-xs text-muted-foreground mb-3 line-clamp-2 ml-6">{task.description}</p>)}

                      {/* Badges */}
                      <div className="flex gap-2 flex-wrap ml-6">
                        <Badge variant={task.priority === "high"
                        ? "destructive"
                        : task.priority === "medium"
                            ? "default"
                            : "secondary"} className="text-xs">
                          {task.priority}
                        </Badge>
                        {task.dueDate && (<Badge variant="outline" className={`text-xs ${new Date(task.dueDate) < new Date() ? "bg-destructive/10 text-destructive" : ""}`}>
                            {new Date(task.dueDate).toLocaleDateString()}
                          </Badge>)}
                      </div>
                    </Card>)))}
              </div>
            </div>);
        })}
      </div>
    </div>);
}
