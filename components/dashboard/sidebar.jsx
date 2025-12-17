"use client";
import { Menu, Plus, LogOut, Settings, Users, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TeamManagementModal } from "./team-management-modal";
import { UserProfileModal } from "./user-profile-modal";
import { SettingsPage } from "./settings-page";
export function Sidebar({ open, onToggle }) {
    const user = useAppStore((state) => state.user);
    const projects = useAppStore((state) => state.projects);
    const selectedProjectId = useAppStore((state) => state.selectedProjectId);
    const setSelectedProjectId = useAppStore((state) => state.setSelectedProjectId);
    const addProject = useAppStore((state) => state.addProject);
    const setUser = useAppStore((state) => state.setUser);
    const [newProjectName, setNewProjectName] = useState("");
    const [showNewProject, setShowNewProject] = useState(false);
    const [showTeamModal, setShowTeamModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showSettingsPage, setShowSettingsPage] = useState(false);
    const handleCreateProject = () => {
        if (newProjectName.trim() && user) {
            const project = {
                id: Math.random().toString(36).substr(2, 9),
                title: newProjectName,
                description: "",
                members: [
                    {
                        userId: user.id,
                        role: "admin",
                        joinedAt: new Date().toISOString(),
                    },
                ],
                createdBy: user.id,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            addProject(project);
            setNewProjectName("");
            setShowNewProject(false);
            setSelectedProjectId(project.id);
        }
    };
    const handleLogout = () => {
        setUser(null);
        setSelectedProjectId(null);
    };
    if (showSettingsPage) {
        return (<div className="flex-1 overflow-auto">
        <button onClick={() => setShowSettingsPage(false)} className="p-4 hover:bg-secondary rounded-lg">
          ← Back to Dashboard
        </button>
        <SettingsPage onLogout={handleLogout}/>
      </div>);
    }
    return (<>
      <aside className={`${open ? "w-64" : "w-20"} transition-all duration-300 bg-sidebar border-r border-sidebar-border flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
          <button onClick={onToggle} className="p-2 hover:bg-sidebar-accent rounded-lg transition">
            <Menu size={20} className="text-sidebar-foreground"/>
          </button>
          {open && <span className="text-sm font-semibold text-sidebar-foreground">Menu</span>}
        </div>

        {/* User Profile */}
        {open && user && (<div className="p-4 border-b border-sidebar-border cursor-pointer hover:bg-sidebar-accent/50 transition" onClick={() => setShowProfileModal(true)}>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
                <p className="text-xs text-sidebar-foreground/60 truncate">{user.email}</p>
              </div>
            </div>
          </div>)}

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-4">
          <div>
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent" size={open ? "default" : "icon"}>
              <Home size={18}/>
              {open && <span className="ml-2">Dashboard</span>}
            </Button>
          </div>

          {/* Projects Section */}
          <div>
            <div className={`text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider ${!open && "hidden"}`}>
              Projects
            </div>
            <div className={`space-y-2 mt-2 ${!open && "hidden"}`}>
              {projects.map((project) => (<button key={project.id} onClick={() => setSelectedProjectId(project.id)} className={`w-full text-left px-3 py-2 rounded-lg transition text-sm ${selectedProjectId === project.id
                ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                : "text-sidebar-foreground hover:bg-sidebar-accent"}`} title={project.title}>
                  <div className="truncate">{project.title}</div>
                </button>))}
            </div>

            <Button onClick={() => setShowNewProject(!showNewProject)} variant="outline" className={`w-full mt-2 ${!open && "w-10"}`} size={open ? "default" : "icon"}>
              <Plus size={16}/>
              {open && <span className="ml-2">New Project</span>}
            </Button>

            {showNewProject && open && (<div className="space-y-2 p-3 bg-sidebar-accent/20 rounded-lg border border-sidebar-border mt-2">
                <input type="text" placeholder="Project name" value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleCreateProject()} className="w-full px-2 py-2 bg-sidebar/50 border border-sidebar-border rounded text-sm text-sidebar-foreground placeholder:text-sidebar-foreground/40 focus:outline-none focus:ring-2 focus:ring-sidebar-ring" autoFocus/>
                <div className="flex gap-2">
                  <Button onClick={handleCreateProject} size="sm" className="flex-1">
                    Create
                  </Button>
                  <Button onClick={() => setShowNewProject(false)} size="sm" variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>)}
          </div>

          {/* Teams Section */}
          <div className={`pt-4 border-t border-sidebar-border ${!open && "hidden"}`}>
            <div className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider">Teams</div>
            <Button onClick={() => setShowTeamModal(true)} variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent mt-2">
              <Users size={16}/>
              <span className="ml-2">Manage Teams</span>
            </Button>
          </div>
        </nav>

        {/* Footer Actions */}
        <div className={`p-4 border-t border-sidebar-border space-y-2 ${!open && "space-y-3"}`}>
          <Button onClick={() => setShowSettingsPage(true)} variant="ghost" size={open ? "default" : "icon"} className={`w-full ${!open && "w-10"} text-sidebar-foreground hover:bg-sidebar-accent`}>
            <Settings size={16}/>
            {open && <span className="ml-2">Settings</span>}
          </Button>
          <Button onClick={handleLogout} variant="ghost" size={open ? "default" : "icon"} className={`w-full ${!open && "w-10"} text-sidebar-foreground hover:bg-sidebar-accent`}>
            <LogOut size={16}/>
            {open && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Modals */}
      {showTeamModal && <TeamManagementModal onClose={() => setShowTeamModal(false)}/>}
      {showProfileModal && <UserProfileModal onClose={() => setShowProfileModal(false)}/>}
    </>);
}
