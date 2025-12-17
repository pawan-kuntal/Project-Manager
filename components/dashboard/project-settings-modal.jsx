"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAppStore } from "@/lib/store";
import { X, Users, Trash2 } from "lucide-react";
export function ProjectSettingsModal({ projectId, onClose }) {
    const project = useAppStore((state) => state.projects.find((p) => p.id === projectId));
    const user = useAppStore((state) => state.user);
    const updateProject = useAppStore((state) => state.updateProject);
    const removeProjectMember = useAppStore((state) => state.removeProjectMember);
    const updateProjectMemberRole = useAppStore((state) => state.updateProjectMemberRole);
    const users = useAppStore((state) => {
        // Get all unique users from tasks to simulate users in system
        return [];
    });
    const [title, setTitle] = useState((project === null || project === void 0 ? void 0 : project.title) || "");
    const [description, setDescription] = useState((project === null || project === void 0 ? void 0 : project.description) || "");
    const [showMembers, setShowMembers] = useState(false);
    const [newMemberEmail, setNewMemberEmail] = useState("");
    if (!project)
        return null;
    const handleSave = () => {
        updateProject(Object.assign(Object.assign({}, project), { title,
            description, updatedAt: new Date().toISOString() }));
        onClose();
    };
    const isProjectAdmin = project.createdBy === (user === null || user === void 0 ? void 0 : user.id);
    return (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 p-6 border-b border-border flex items-center justify-between bg-background">
          <h2 className="text-lg font-semibold">Project Settings</h2>
          <button onClick={onClose} className="p-1 hover:bg-secondary rounded">
            <X size={20}/>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Project Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Project Information</h3>
            <div>
              <label className="text-sm font-medium block mb-2">Title</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} disabled={!isProjectAdmin}/>
            </div>
            <div>
              <label className="text-sm font-medium block mb-2">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} disabled={!isProjectAdmin} className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground disabled:opacity-50" rows={3}/>
            </div>
          </div>

          {/* Members Section */}
          <div className="space-y-4 border-t border-border pt-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-base flex items-center gap-2">
                <Users size={18}/>
                Project Members
              </h3>
              <span className="text-xs text-muted-foreground">{project.members.length} member(s)</span>
            </div>

            {/* Members List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {project.members.length === 0 ? (<p className="text-sm text-muted-foreground py-4">No members yet</p>) : (project.members.map((member) => (<div key={member.userId} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {member.userId === project.createdBy ? "Project Owner" : "Member"}
                      </p>
                      <p className="text-xs text-muted-foreground">{member.userId}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {member.userId !== project.createdBy && (<>
                          <select value={member.role} onChange={(e) => updateProjectMemberRole(projectId, member.userId, e.target.value)} disabled={!isProjectAdmin} className="text-xs px-2 py-1 border border-input rounded bg-background disabled:opacity-50">
                            <option value="admin">Admin</option>
                            <option value="member">Member</option>
                            <option value="viewer">Viewer</option>
                          </select>
                          <button onClick={() => removeProjectMember(projectId, member.userId)} disabled={!isProjectAdmin} className="p-1 hover:bg-destructive/20 rounded disabled:opacity-50">
                            <Trash2 size={16} className="text-destructive"/>
                          </button>
                        </>)}
                      {member.userId === project.createdBy && (<span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Owner</span>)}
                    </div>
                  </div>)))}
            </div>

            {/* Add Member */}
            {isProjectAdmin && (<div className="pt-2 flex gap-2">
                <Input placeholder="Enter email to add member" value={newMemberEmail} onChange={(e) => setNewMemberEmail(e.target.value)} className="text-sm"/>
                <Button size="sm" onClick={() => {
                if (newMemberEmail.trim()) {
                    // Simulate adding member
                    setNewMemberEmail("");
                }
            }}>
                  Add
                </Button>
              </div>)}
          </div>

          {/* Actions */}
          <div className="flex gap-2 border-t border-border pt-6">
            <Button onClick={handleSave} disabled={!isProjectAdmin} className="flex-1">
              Save Changes
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
              Close
            </Button>
          </div>
        </div>
      </Card>
    </div>);
}
