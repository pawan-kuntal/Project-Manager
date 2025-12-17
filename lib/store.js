import { create } from "zustand"

export const useAppStore = create((set, get) => ({
  user: null,
  projects: [],
  tasks: [],
  teams: [],
  selectedProjectId: null,
  comments: [],
  activityLog: [],
  userPresence: new Map(),

  setUser: (user) => set({ user }),
  setProjects: (projects) => set({ projects }),
  addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
  updateProject: (project) => set((state) => ({ projects: state.projects.map((p) => (p.id === project.id ? project : p)) })),
  deleteProject: (projectId) => set((state) => ({ projects: state.projects.filter((p) => p.id !== projectId) })),

  addProjectMember: (projectId, userId, role) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              members: [...p.members, { userId, role, joinedAt: new Date().toISOString() }],
            }
          : p,
      ),
    })),
  removeProjectMember: (projectId, userId) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId ? { ...p, members: p.members.filter((m) => m.userId !== userId) } : p,
      ),
    })),
  updateProjectMemberRole: (projectId, userId, role) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId
          ? { ...p, members: p.members.map((m) => (m.userId === userId ? { ...m, role } : m)) }
          : p,
      ),
    })),

  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (task) => set((state) => ({ tasks: state.tasks.map((t) => (t.id === task.id ? task : t)) })),
  deleteTask: (taskId) => set((state) => ({ tasks: state.tasks.filter((t) => t.id !== taskId) })),

  setTeams: (teams) => set({ teams }),
  addTeam: (team) => set((state) => ({ teams: [...state.teams, team] })),
  updateTeam: (team) => set((state) => ({ teams: state.teams.map((t) => (t.id === team.id ? team : t)) })),
  deleteTeam: (teamId) => set((state) => ({ teams: state.teams.filter((t) => t.id !== teamId) })),
  addTeamMember: (teamId, userId, role) =>
    set((state) => ({
      teams: state.teams.map((t) =>
        t.id === teamId
          ? { ...t, members: [...t.members, { userId, role, joinedAt: new Date().toISOString() }] }
          : t,
      ),
    })),
  removeTeamMember: (teamId, userId) =>
    set((state) => ({
      teams: state.teams.map((t) =>
        t.id === teamId ? { ...t, members: t.members.filter((m) => m.userId !== userId) } : t,
      ),
    })),
  updateTeamMemberRole: (teamId, userId, role) =>
    set((state) => ({
      teams: state.teams.map((t) =>
        t.id === teamId
          ? { ...t, members: t.members.map((m) => (m.userId === userId ? { ...m, role } : m)) }
          : t,
      ),
    })),

  addComment: (comment) => set((state) => ({ comments: [...state.comments, comment] })),
  deleteComment: (commentId) => set((state) => ({ comments: state.comments.filter((c) => c.id !== commentId) })),

  logActivity: (activity) => set((state) => ({ activityLog: [activity, ...state.activityLog] })),
  getProjectActivity: (projectId) => get().activityLog.filter((a) => a.projectId === projectId),

  updateUserPresence: (presence) => set((state) => ({ userPresence: new Map(state.userPresence).set(presence.userId, presence) })),
  removeUserPresence: (userId) => set((state) => { const map = new Map(state.userPresence); map.delete(userId); return { userPresence: map } }),
  getActiveUsers: (projectId) => Array.from(get().userPresence.values()).filter((p) => p.projectId === projectId && p.isActive),

  setSelectedProjectId: (projectId) => set({ selectedProjectId: projectId }),
}))
