import { create } from "zustand";
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
    addProject: (project) => set((state) => ({
        projects: [...state.projects, project],
    })),
    updateProject: (project) => set((state) => ({
        projects: state.projects.map((p) => (p.id === project.id ? project : p)),
    })),
    deleteProject: (projectId) => set((state) => ({
        projects: state.projects.filter((p) => p.id !== projectId),
    })),
    addProjectMember: (projectId, userId, role) => set((state) => ({
        projects: state.projects.map((p) => p.id === projectId
            ? Object.assign(Object.assign({}, p), { members: [
                    ...p.members,
                    {
                        userId,
                        role,
                        joinedAt: new Date().toISOString(),
                    },
                ] }) : p),
    })),
    removeProjectMember: (projectId, userId) => set((state) => ({
        projects: state.projects.map((p) => p.id === projectId
            ? Object.assign(Object.assign({}, p), { members: p.members.filter((m) => m.userId !== userId) }) : p),
    })),
    updateProjectMemberRole: (projectId, userId, role) => set((state) => ({
        projects: state.projects.map((p) => p.id === projectId
            ? Object.assign(Object.assign({}, p), { members: p.members.map((m) => (m.userId === userId ? Object.assign(Object.assign({}, m), { role }) : m)) }) : p),
    })),
    setTasks: (tasks) => set({ tasks }),
    addTask: (task) => set((state) => ({
        tasks: [...state.tasks, task],
    })),
    updateTask: (task) => set((state) => ({
        tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
    })),
    deleteTask: (taskId) => set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== taskId),
    })),
    setTeams: (teams) => set({ teams }),
    addTeam: (team) => set((state) => ({
        teams: [...state.teams, team],
    })),
    updateTeam: (team) => set((state) => ({
        teams: state.teams.map((t) => (t.id === team.id ? team : t)),
    })),
    deleteTeam: (teamId) => set((state) => ({
        teams: state.teams.filter((t) => t.id !== teamId),
    })),
    addTeamMember: (teamId, userId, role) => set((state) => ({
        teams: state.teams.map((t) => t.id === teamId
            ? Object.assign(Object.assign({}, t), { members: [
                    ...t.members,
                    {
                        userId,
                        role,
                        joinedAt: new Date().toISOString(),
                    },
                ] }) : t),
    })),
    removeTeamMember: (teamId, userId) => set((state) => ({
        teams: state.teams.map((t) => t.id === teamId
            ? Object.assign(Object.assign({}, t), { members: t.members.filter((m) => m.userId !== userId) }) : t),
    })),
    updateTeamMemberRole: (teamId, userId, role) => set((state) => ({
        teams: state.teams.map((t) => t.id === teamId
            ? Object.assign(Object.assign({}, t), { members: t.members.map((m) => (m.userId === userId ? Object.assign(Object.assign({}, m), { role }) : m)) }) : t),
    })),
    // Comment actions
    addComment: (comment) => set((state) => ({
        comments: [...state.comments, comment],
    })),
    deleteComment: (commentId) => set((state) => ({
        comments: state.comments.filter((c) => c.id !== commentId),
    })),
    // Activity log actions
    logActivity: (activity) => set((state) => ({
        activityLog: [activity, ...state.activityLog],
    })),
    getProjectActivity: (projectId) => {
        const { activityLog } = get();
        return activityLog.filter((a) => a.projectId === projectId).slice(0, 50);
    },
    // Presence actions
    updateUserPresence: (presence) => set((state) => {
        const newPresence = new Map(state.userPresence);
        newPresence.set(presence.userId, presence);
        return { userPresence: newPresence };
    }),
    removeUserPresence: (userId) => set((state) => {
        const newPresence = new Map(state.userPresence);
        newPresence.delete(userId);
        return { userPresence: newPresence };
    }),
    getActiveUsers: (projectId) => {
        const { userPresence } = get();
        const now = new Date();
        return Array.from(userPresence.values())
            .filter((p) => p.projectId === projectId && p.isActive)
            .filter((p) => new Date(p.lastSeen).getTime() > now.getTime() - 5 * 60 * 1000); // Last 5 minutes
    },
    setSelectedProjectId: (projectId) => {
        set((state) => {
            if (projectId && state.user) {
                const activity = {
                    id: Math.random().toString(36).substr(2, 9),
                    projectId,
                    userId: state.user.id,
                    userName: state.user.name,
                    action: "created_task",
                    timestamp: new Date().toISOString(),
                };
                return {
                    selectedProjectId: projectId,
                    activityLog: [activity, ...state.activityLog],
                };
            }
            return { selectedProjectId: projectId };
        });
    },
}));
