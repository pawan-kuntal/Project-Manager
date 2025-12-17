"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/lib/store";
import { formatDistanceToNow } from "date-fns";
import { Trash2 } from "lucide-react";
export function TaskComments({ taskId }) {
    const user = useAppStore((state) => state.user);
    const comments = useAppStore((state) => state.comments.filter((c) => c.taskId === taskId));
    const addComment = useAppStore((state) => state.addComment);
    const deleteComment = useAppStore((state) => state.deleteComment);
    const [newComment, setNewComment] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const handleAddComment = () => __awaiter(this, void 0, void 0, function* () {
        if (!newComment.trim() || !user)
            return;
        setIsLoading(true);
        try {
            const comment = {
                id: Math.random().toString(36).substr(2, 9),
                taskId,
                userId: user.id,
                userName: user.name,
                content: newComment,
                createdAt: new Date().toISOString(),
            };
            addComment(comment);
            setNewComment("");
        }
        finally {
            setIsLoading(false);
        }
    });
    return (<div className="space-y-4">
      <h4 className="font-semibold text-sm">Comments ({comments.length})</h4>

      {/* Comment List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {comments.length === 0 ? (<p className="text-xs text-muted-foreground">No comments yet</p>) : (comments.map((comment) => (<div key={comment.id} className="p-3 bg-secondary/30 rounded-lg">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="text-sm font-medium">{comment.userName}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </p>
                </div>
                {comment.userId === (user === null || user === void 0 ? void 0 : user.id) && (<button onClick={() => deleteComment(comment.id)} className="p-1 hover:bg-destructive/20 rounded">
                    <Trash2 size={14} className="text-destructive"/>
                  </button>)}
              </div>
              <p className="text-sm mt-2">{comment.content}</p>
            </div>)))}
      </div>

      {/* Add Comment */}
      <div className="flex gap-2">
        <Input placeholder="Add a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAddComment()} disabled={isLoading} className="text-sm"/>
        <Button onClick={handleAddComment} disabled={!newComment.trim() || isLoading} size="sm">
          Post
        </Button>
      </div>
    </div>);
}
