"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAppStore } from "@/lib/store";
import { X, Users, Plus, Trash2 } from "lucide-react";
export function TeamManagementModal({ onClose }) {
    const teams = useAppStore((state) => state.teams);
    const user = useAppStore((state) => state.user);
    const addTeam = useAppStore((state) => state.addTeam);
    const deleteTeam = useAppStore((state) => state.deleteTeam);
    const [showNewTeam, setShowNewTeam] = useState(false);
    const [teamName, setTeamName] = useState("");
    const [teamDesc, setTeamDesc] = useState("");
    const handleCreateTeam = () => {
        if (teamName.trim() && user) {
            const newTeam = {
                id: Math.random().toString(36).substr(2, 9),
                name: teamName,
                description: teamDesc,
                members: [
                    {
                        userId: user.id,
                        role: "admin",
                        joinedAt: new Date().toISOString(),
                    },
                ],
                owner: user.id,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            addTeam(newTeam);
            setTeamName("");
            setTeamDesc("");
            setShowNewTeam(false);
        }
    };
    return (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 p-6 border-b border-border flex items-center justify-between bg-background">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Users size={20}/>
            Teams
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-secondary rounded">
            <X size={20}/>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Teams List */}
          <div className="space-y-3">
            {teams.length === 0 ? (<div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No teams yet. Create your first team!</p>
              </div>) : (teams.map((team) => (<Card key={team.id} className="p-4 border">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold">{team.name}</h4>
                      <p className="text-sm text-muted-foreground">{team.description}</p>
                    </div>
                    <button onClick={() => deleteTeam(team.id)} className="p-1 hover:bg-destructive/20 rounded" title="Delete team">
                      <Trash2 size={16} className="text-destructive"/>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{team.members.length} member(s)</span>
                    <Button size="sm" variant="outline">
                      Manage
                    </Button>
                  </div>
                </Card>)))}
          </div>

          {/* Create New Team */}
          <div className="border-t border-border pt-4">
            {!showNewTeam ? (<Button onClick={() => setShowNewTeam(true)} className="w-full gap-2">
                <Plus size={16}/>
                Create New Team
              </Button>) : (<div className="space-y-3 p-4 bg-secondary/30 rounded-lg">
                <div>
                  <label className="text-sm font-medium block mb-1">Team Name</label>
                  <Input placeholder="Enter team name" value={teamName} onChange={(e) => setTeamName(e.target.value)} autoFocus/>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Description</label>
                  <textarea placeholder="Team description (optional)" value={teamDesc} onChange={(e) => setTeamDesc(e.target.value)} className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground" rows={2}/>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleCreateTeam} className="flex-1">
                    Create
                  </Button>
                  <Button onClick={() => setShowNewTeam(false)} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>)}
          </div>
        </div>
      </Card>
    </div>);
}
