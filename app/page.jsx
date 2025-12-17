"use client";
import { useState } from "react";
import { AuthPage } from "@/components/auth/auth-page";
import { Dashboard } from "@/components/dashboard/dashboard";
export default function Home() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    if (!isAuthenticated) {
        return <AuthPage onAuthSuccess={() => setIsAuthenticated(true)}/>;
    }
    return <Dashboard />;
}
