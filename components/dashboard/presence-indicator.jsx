"use client";
import { useAppStore } from "@/lib/store";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
export function PresenceIndicator({ projectId }) {
    const getActiveUsers = useAppStore((state) => state.getActiveUsers);
    const activeUsers = getActiveUsers(projectId);
    if (activeUsers.length === 0) {
        return null;
    }
    return (<div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground">Active:</span>
      <div className="flex -space-x-2">
        {activeUsers.slice(0, 3).map((user) => (<div key={user.userId} title={user.userName} className="relative">
            <Avatar className="h-6 w-6 border-2 border-background">
              <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                {user.userName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {user.isActive && (<div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-background"/>)}
          </div>))}
        {activeUsers.length > 3 && (<div className="flex items-center justify-center h-6 w-6 rounded-full bg-secondary text-xs font-medium">
            +{activeUsers.length - 3}
          </div>)}
      </div>
    </div>);
}
