"use client";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Calendar, CheckCircle2, AlertCircle, Clock } from "lucide-react";
export function AnalyticsDashboard({ projectTitle, tasks }) {
    // Calculate statistics
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === "done").length;
    const inProgressTasks = tasks.filter((t) => t.status === "in-progress").length;
    const reviewTasks = tasks.filter((t) => t.status === "review").length;
    const todoTasks = tasks.filter((t) => t.status === "todo").length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    // Count by priority
    const priorityCounts = {
        high: tasks.filter((t) => t.priority === "high").length,
        medium: tasks.filter((t) => t.priority === "medium").length,
        low: tasks.filter((t) => t.priority === "low").length,
    };
    // Status distribution for pie chart
    const statusData = [
        { name: "Todo", value: todoTasks, fill: "hsl(var(--color-chart-1))" },
        { name: "In Progress", value: inProgressTasks, fill: "hsl(var(--color-chart-2))" },
        { name: "Review", value: reviewTasks, fill: "hsl(var(--color-chart-3))" },
        { name: "Done", value: completedTasks, fill: "hsl(var(--color-chart-4))" },
    ].filter((item) => item.value > 0);
    // Priority distribution for bar chart
    const priorityData = [
        { name: "High", value: priorityCounts.high },
        { name: "Medium", value: priorityCounts.medium },
        { name: "Low", value: priorityCounts.low },
    ];
    // Overdue tasks
    const overdueTasks = tasks.filter((t) => {
        if (!t.dueDate || t.status === "done")
            return false;
        return new Date(t.dueDate) < new Date();
    });
    // Tasks due this week
    const now = new Date();
    const oneWeekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const dueSoonTasks = tasks.filter((t) => {
        if (!t.dueDate || t.status === "done")
            return false;
        const dueDate = new Date(t.dueDate);
        return dueDate >= now && dueDate <= oneWeekLater;
    });
    return (<div className="p-8 space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Tasks</p>
              <p className="text-3xl font-bold">{totalTasks}</p>
            </div>
            <Calendar className="text-primary opacity-50" size={24}/>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Completed</p>
              <p className="text-3xl font-bold">{completedTasks}</p>
              <p className="text-xs text-muted-foreground mt-1">{completionRate}% done</p>
            </div>
            <CheckCircle2 className="text-green-500 opacity-50" size={24}/>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">In Progress</p>
              <p className="text-3xl font-bold">{inProgressTasks}</p>
            </div>
            <Clock className="text-blue-500 opacity-50" size={24}/>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Overdue</p>
              <p className="text-3xl font-bold">{overdueTasks.length}</p>
              {overdueTasks.length > 0 && <p className="text-xs text-destructive mt-1">Attention needed</p>}
            </div>
            <AlertCircle className="text-destructive opacity-50" size={24}/>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution - Pie Chart */}
        {statusData.length > 0 && (<Card className="p-6">
            <h3 className="font-semibold mb-4">Task Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                  {statusData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.fill}/>))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>)}

        {/* Priority Distribution - Bar Chart */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Tasks by Priority</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priorityData}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="name"/>
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="hsl(var(--color-primary))"/>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Status Details */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Task Status Breakdown</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-secondary/30 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Todo</p>
            <p className="text-2xl font-bold">{todoTasks}</p>
            {totalTasks > 0 && (<p className="text-xs text-muted-foreground mt-1">{Math.round((todoTasks / totalTasks) * 100)}%</p>)}
          </div>
          <div className="p-4 bg-secondary/30 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">In Progress</p>
            <p className="text-2xl font-bold">{inProgressTasks}</p>
            {totalTasks > 0 && (<p className="text-xs text-muted-foreground mt-1">{Math.round((inProgressTasks / totalTasks) * 100)}%</p>)}
          </div>
          <div className="p-4 bg-secondary/30 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Review</p>
            <p className="text-2xl font-bold">{reviewTasks}</p>
            {totalTasks > 0 && (<p className="text-xs text-muted-foreground mt-1">{Math.round((reviewTasks / totalTasks) * 100)}%</p>)}
          </div>
          <div className="p-4 bg-secondary/30 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Completed</p>
            <p className="text-2xl font-bold">{completedTasks}</p>
            {totalTasks > 0 && <p className="text-xs text-muted-foreground mt-1">{completionRate}%</p>}
          </div>
        </div>
      </Card>

      {/* Alerts */}
      {(overdueTasks.length > 0 || dueSoonTasks.length > 0) && (<Card className="p-6 border-l-4 border-l-accent">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <AlertCircle size={18}/>
            Timeline Alerts
          </h3>
          {overdueTasks.length > 0 && (<div className="mb-4">
              <p className="text-sm font-medium text-destructive mb-2">{overdueTasks.length} Overdue Task(s)</p>
              <div className="space-y-1">
                {overdueTasks.slice(0, 3).map((task) => (<p key={task.id} className="text-xs text-muted-foreground">
                    • {task.title}
                  </p>))}
              </div>
            </div>)}
          {dueSoonTasks.length > 0 && (<div>
              <p className="text-sm font-medium text-accent mb-2">{dueSoonTasks.length} Due This Week</p>
              <div className="space-y-1">
                {dueSoonTasks.slice(0, 3).map((task) => (<p key={task.id} className="text-xs text-muted-foreground">
                    • {task.title}
                  </p>))}
              </div>
            </div>)}
        </Card>)}
    </div>);
}
