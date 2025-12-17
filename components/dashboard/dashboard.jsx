"use client";
import { useState } from "react";
import { Sidebar } from "./sidebar";
import { MainContent } from "./main-content";
import { useAppStore } from "@/lib/store";
export function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const user = useAppStore((state) => state.user);
    if (!user) {
        return <div>Loading...</div>;
    }
    return (<div className="flex h-screen bg-background">
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)}/>
      <MainContent />
    </div>);
}
