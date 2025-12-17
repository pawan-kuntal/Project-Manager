"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAppStore } from "@/lib/store";
import { X, Mail, User, Lock } from "lucide-react";
export function UserProfileModal({ onClose }) {
    const user = useAppStore((state) => state.user);
    const setUser = useAppStore((state) => state.setUser);
    const [name, setName] = useState((user === null || user === void 0 ? void 0 : user.name) || "");
    const [email, setEmail] = useState((user === null || user === void 0 ? void 0 : user.email) || "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [activeTab, setActiveTab] = useState("profile");
    const [message, setMessage] = useState("");
    if (!user)
        return null;
    const handleSaveProfile = () => {
        if (name.trim() && email.trim()) {
            setUser(Object.assign(Object.assign({}, user), { name: name.trim(), email: email.trim() }));
            setMessage("Profile updated successfully!");
            setTimeout(() => setMessage(""), 3000);
        }
    };
    const handleChangePassword = () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            setMessage("All fields are required");
            return;
        }
        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }
        if (newPassword.length < 8) {
            setMessage("Password must be at least 8 characters");
            return;
        }
        // Simulate password change
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setMessage("Password changed successfully!");
        setTimeout(() => setMessage(""), 3000);
    };
    return (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 p-6 border-b border-border flex items-center justify-between bg-background">
          <h2 className="text-lg font-semibold">Profile Settings</h2>
          <button onClick={onClose} className="p-1 hover:bg-secondary rounded">
            <X size={20}/>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-border">
            <button onClick={() => setActiveTab("profile")} className={`pb-2 px-1 font-medium transition ${activeTab === "profile"
            ? "border-b-2 border-primary text-primary"
            : "text-muted-foreground hover:text-foreground"}`}>
              Profile Information
            </button>
            <button onClick={() => setActiveTab("password")} className={`pb-2 px-1 font-medium transition ${activeTab === "password"
            ? "border-b-2 border-primary text-primary"
            : "text-muted-foreground hover:text-foreground"}`}>
              Password
            </button>
          </div>

          {/* Message Alert */}
          {message && (<div className={`mb-4 p-3 rounded-lg text-sm ${message.includes("error") || message.includes("not")
                ? "bg-destructive/10 text-destructive"
                : "bg-green-500/10 text-green-700"}`}>
              {message}
            </div>)}

          {/* Profile Tab */}
          {activeTab === "profile" && (<div className="space-y-4">
              <div className="flex items-center gap-4 pb-6 border-b border-border">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.role}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <User size={16}/>
                  Full Name
                </label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name"/>
              </div>

              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Mail size={16}/>
                  Email Address
                </label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="your@email.com"/>
              </div>

              <div className="bg-secondary/30 p-4 rounded-lg text-sm">
                <p className="font-medium mb-2">Account Type</p>
                <p className="text-muted-foreground capitalize">{user.role} Access</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {user.role === "admin"
                ? "You have full control over all projects and team members."
                : user.role === "member"
                    ? "You can manage projects and tasks assigned to you."
                    : "You can view projects but cannot make changes."}
                </p>
              </div>

              <Button onClick={handleSaveProfile} className="w-full">
                Save Profile Changes
              </Button>
            </div>)}

          {/* Password Tab */}
          {activeTab === "password" && (<div className="space-y-4">
              <div className="bg-secondary/30 p-4 rounded-lg text-sm mb-4">
                <p className="font-medium mb-1">Password Requirements</p>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Minimum 8 characters</li>
                  <li>• Should contain uppercase and lowercase letters</li>
                  <li>• Consider including numbers and symbols</li>
                </ul>
              </div>

              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Lock size={16}/>
                  Current Password
                </label>
                <Input type="password" placeholder="Enter current password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}/>
              </div>

              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Lock size={16}/>
                  New Password
                </label>
                <Input type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
              </div>

              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Lock size={16}/>
                  Confirm Password
                </label>
                <Input type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
              </div>

              <Button onClick={handleChangePassword} className="w-full">
                Change Password
              </Button>
            </div>)}
        </div>
      </Card>
    </div>);
}
