"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Grid2X2, List, MoreVertical, BarChart3, MessageSquare } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useState } from "react";
import { KanbanBoard } from "./kanban-board";
import { TaskForm } from "./task-form";
import { ProjectSettingsModal } from "./project-settings-modal";
import { AnalyticsDashboard } from "./analytics-dashboard";
import { CollaborationPanel } from "./collaboration-panel";
export function MainContent() {
    const selectedProjectId = useAppStore((state) => state.selectedProjectId);
    const projects = useAppStore((state) => state.projects);
    const tasks = useAppStore((state) => state.tasks);
    const [viewMode, setViewMode] = useState("kanban");
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [showProjectSettings, setShowProjectSettings] = useState(false);
    const selectedProject = projects.find((p) => p.id === selectedProjectId);
    const projectTasks = selectedProjectId ? tasks.filter((t) => t.projectId === selectedProjectId) : [];
    if (!selectedProjectId) {
        return (<main className="flex-1 p-8 flex flex-col items-center justify-center">
        <Card className="p-12 text-center max-w-md">
          <div className="mb-4 text-4xl">📋</div>
          <h2 className="text-2xl font-bold mb-2">Welcome to Project Manager</h2>
          <p className="text-muted-foreground mb-6">Create your first project to get started</p>
          <Button disabled>Create Project (use sidebar)</Button>
        </Card>
      </main>);
    }
    return (<main className="flex-1 overflow-hidden flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border px-8 py-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">{selectedProject === null || selectedProject === void 0 ? void 0 : selectedProject.title}</h1>
            <p className="text-muted-foreground mt-1">{(selectedProject === null || selectedProject === void 0 ? void 0 : selectedProject.description) || "No description added"}</p>
            <p className="text-xs text-muted-foreground mt-2">{selectedProject === null || selectedProject === void 0 ? void 0 : selectedProject.members.length} member(s)</p>
          </div>
          <button onClick={() => setShowProjectSettings(true)} className="p-2 hover:bg-secondary rounded-lg transition">
            <MoreVertical size={20} className="text-muted-foreground"/>
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 bg-secondary/30 rounded-lg p-1">
            <button onClick={() => setViewMode("kanban")} className={`px-3 py-2 rounded transition flex items-center gap-2 ${viewMode === "kanban"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-secondary"}`}>
              <Grid2X2 size={18}/>
              <span className="text-sm font-medium">Kanban</span>
            </button>
            <button onClick={() => setViewMode("list")} className={`px-3 py-2 rounded transition flex items-center gap-2 ${viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}`}>
              <List size={18}/>
              <span className="text-sm font-medium">List</span>
            </button>
            <button onClick={() => setViewMode("analytics")} className={`px-3 py-2 rounded transition flex items-center gap-2 ${viewMode === "analytics"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-secondary"}`}>
              <BarChart3 size={18}/>
              <span className="text-sm font-medium">Analytics</span>
            </button>
            <button onClick={() => setViewMode("collaboration")} className={`px-3 py-2 rounded transition flex items-center gap-2 ${viewMode === "collaboration"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-secondary"}`}>
              <MessageSquare size={18}/>
              <span className="text-sm font-medium">Activity</span>
            </button>
          </div>
          {viewMode !== "analytics" && viewMode !== "collaboration" && (<Button onClick={() => setShowTaskForm(true)} size="sm" className="gap-2">
              <Plus size={16}/>
              Add Task
            </Button>)}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto">
        {viewMode === "analytics" ? (<AnalyticsDashboard projectTitle={(selectedProject === null || selectedProject === void 0 ? void 0 : selectedProject.title) || ""} tasks={projectTasks}/>) : viewMode === "collaboration" ? (<div className="p-8 max-w-2xl">
            <CollaborationPanel projectId={selectedProjectId}/>
          </div>) : projectTasks.length === 0 ? (<div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-5xl mb-4">✨</div>
              <p className="text-muted-foreground">No tasks yet. Create one to get started!</p>
            </div>
          </div>) : viewMode === "kanban" ? (<KanbanBoard tasks={projectTasks}/>) : (<div className="p-8">
            <div className="space-y-3">
              {projectTasks.map((task) => (<Card key={task.id} className="p-4 hover:shadow-md transition cursor-pointer border-l-4 border-l-primary">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{task.title}</h3>
                      {task.description && <p className="text-sm text-muted-foreground mt-1">{task.description}</p>}
                    </div>
                    <div className="flex gap-2 text-xs flex-shrink-0 ml-4">
                      <span className={`px-3 py-1 rounded-full font-medium ${task.priority === "high"
                    ? "bg-destructive/20 text-destructive"
                    : task.priority === "medium"
                        ? "bg-accent/20 text-accent-foreground"
                        : "bg-secondary text-secondary-foreground"}`}>
                        {task.priority}
                      </span>
                      <span className="px-3 py-1 rounded-full font-medium bg-primary/20 text-primary">
                        {task.status === "in-progress" ? "In Progress" : task.status}
                      </span>
                    </div>
                  </div>
                </Card>))}
            </div>
          </div>)}
      </div>

      {/* Modals */}
      {showTaskForm && <TaskForm projectId={selectedProjectId} onClose={() => setShowTaskForm(false)}/>}
      {showProjectSettings && selectedProjectId && (<ProjectSettingsModal projectId={selectedProjectId} onClose={() => setShowProjectSettings(false)}/>)}
    </main>);
}
