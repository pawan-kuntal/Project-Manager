"use client";
import { useAppStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { UserPlus, CheckCircle2, MessageSquare, Edit2, Plus } from "lucide-react";
export function ActivityFeed({ projectId, limit = 10 }) {
    const getProjectActivity = useAppStore((state) => state.getProjectActivity);
    const activities = getProjectActivity(projectId).slice(0, limit);
    const getActivityIcon = (action) => {
        switch (action) {
            case "created_task":
                return <Plus size={16} className="text-blue-500"/>;
            case "completed_task":
                return <CheckCircle2 size={16} className="text-green-500"/>;
            case "updated_task":
                return <Edit2 size={16} className="text-amber-500"/>;
            case "added_member":
                return <UserPlus size={16} className="text-purple-500"/>;
            case "commented":
                return <MessageSquare size={16} className="text-cyan-500"/>;
            default:
                return <Plus size={16}/>;
        }
    };
    const getActivityDescription = (activity) => {
        switch (activity.action) {
            case "created_task":
                return `created task "${activity.taskTitle}"`;
            case "completed_task":
                return `completed task "${activity.taskTitle}"`;
            case "updated_task":
                return `updated task "${activity.taskTitle}"`;
            case "added_member":
                return `added a new team member`;
            case "commented":
                return `commented on "${activity.taskTitle}"`;
            default:
                return activity.action;
        }
    };
    if (activities.length === 0) {
        return (<Card className="p-4">
        <p className="text-sm text-muted-foreground text-center py-4">No activity yet</p>
      </Card>);
    }
    return (<Card className="p-4">
      <h3 className="font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {activities.map((activity) => (<div key={activity.id} className="flex gap-3 items-start pb-3 border-b border-border last:border-b-0 last:pb-0">
            <div className="flex-shrink-0 mt-1">{getActivityIcon(activity.action)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm">
                <span className="font-medium">{activity.userName}</span>
                <span className="text-muted-foreground"> {getActivityDescription(activity)}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
              </p>
            </div>
          </div>))}
      </div>
    </Card>);
}
