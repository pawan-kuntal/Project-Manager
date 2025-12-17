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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAppStore } from "@/lib/store";
export function AuthPage({ onAuthSuccess }) {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const setUser = useAppStore((state) => state.setUser);
    const handleAuth = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        setLoading(true);
        try {
            yield new Promise((resolve) => setTimeout(resolve, 800));
            const userId = Math.random().toString(36).substr(2, 9);
            setUser({
                id: userId,
                name: isSignUp ? name : email.split("@")[0],
                email,
                role: "admin",
            });
            onAuthSuccess();
        }
        finally {
            setLoading(false);
        }
    });
    return (<div className="min-h-screen bg-gradient-to-br from-background via-blue-950/20 to-purple-950/30 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-float"></div>
      </div>

      <Card className="w-full max-w-md relative z-10 border-purple-500/30 shadow-2xl shadow-purple-900/50 hover:shadow-purple-900/70 transition-all duration-300 ease-out bg-card/50 backdrop-blur-sm">
        <CardHeader className="space-y-2 pb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
              ✓
            </div>
          </div>
          <CardTitle className="text-3xl bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Project Manager
          </CardTitle>
          <CardDescription className="text-purple-300/80">
            {isSignUp ? "Create your account to get started" : "Welcome back to your workspace"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            {isSignUp && (<div className="animate-slide-in">
                <label className="text-sm font-medium text-purple-300">Name</label>
                <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required className="bg-background/50 border-purple-500/30 focus:border-purple-500 focus:ring-purple-500/50 text-foreground placeholder:text-muted-foreground"/>
              </div>)}
            <div className="animate-slide-in">
              <label className="text-sm font-medium text-purple-300">Email</label>
              <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-background/50 border-purple-500/30 focus:border-purple-500 focus:ring-purple-500/50 text-foreground placeholder:text-muted-foreground"/>
            </div>
            <div className="animate-slide-in">
              <label className="text-sm font-medium text-purple-300">Password</label>
              <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-background/50 border-purple-500/30 focus:border-purple-500 focus:ring-purple-500/50 text-foreground placeholder:text-muted-foreground"/>
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 ease-out" disabled={loading}>
              {loading ? (<span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Loading...
                </span>) : isSignUp ? ("✨ Sign Up") : ("🚀 Sign In")}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
            </span>{" "}
            <button onClick={() => setIsSignUp(!isSignUp)} className="text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text hover:from-purple-300 hover:to-blue-300 font-semibold transition-all duration-300 ease-out hover:underline">
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>);
}
