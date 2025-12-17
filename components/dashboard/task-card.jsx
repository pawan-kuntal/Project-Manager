"use client";
import { Card } from "@/components/ui/card";
export function TaskCard({ task }) {
    const getPriorityColor = (priority) => {
        switch (priority) {
            case "high":
                return "bg-red-500/20 text-red-300";
            case "medium":
                return "bg-yellow-500/20 text-yellow-300";
            case "low":
                return "bg-green-500/20 text-green-300";
            default:
                return "";
        }
    };
    return (<Card className="p-4 hover:shadow-lg hover:bg-card/80 transition-all duration-300 ease-out cursor-grab active:cursor-grabbing">
      <h4 className="font-semibold text-sm mb-2">{task.title}</h4>
      {task.description && <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{task.description}</p>}
      <div className="flex gap-2 flex-wrap">
        <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>{task.priority}</span>
        {task.dueDate && (<span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
            {new Date(task.dueDate).toLocaleDateString()}
          </span>)}
      </div>
    </Card>);
}
