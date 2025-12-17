"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAppStore } from "@/lib/store";
import { X } from "lucide-react";
export function TaskForm({ projectId, onClose }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("medium");
    const [dueDate, setDueDate] = useState("");
    const addTask = useAppStore((state) => state.addTask);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            const task = {
                id: Math.random().toString(36).substr(2, 9),
                projectId,
                title,
                description,
                status: "todo",
                priority,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                dueDate: dueDate || undefined,
            };
            addTask(task);
            onClose();
        }
    };
    return (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-semibold">Create Task</h2>
          <button onClick={onClose} className="p-1 hover:bg-secondary rounded">
            <X size={20}/>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">Title</label>
            <Input placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} required/>
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Description</label>
            <textarea placeholder="Task description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground" rows={3}/>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium block mb-1">Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Due Date</label>
              <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}/>
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              Create Task
            </Button>
            <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>);
}
