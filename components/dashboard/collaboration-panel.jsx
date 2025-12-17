"use client";
import { Card } from "@/components/ui/card";
import { ActivityFeed } from "./activity-feed";
import { PresenceIndicator } from "./presence-indicator";
export function CollaborationPanel({ projectId }) {
    return (<div className="space-y-4">
      <Card className="p-4">
        <PresenceIndicator projectId={projectId}/>
      </Card>
      <ActivityFeed projectId={projectId}/>
    </div>);
}
