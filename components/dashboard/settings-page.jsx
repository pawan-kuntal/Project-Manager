"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppStore } from "@/lib/store";
import { useTheme } from "next-themes";
import { useLanguage } from "@/components/language-provider";
import { useT } from "@/lib/i18n";
import { Bell, Lock, Eye, Database, LogOut, ChevronRight, Heart } from "lucide-react";
export function SettingsPage({ onLogout }) {
    const user = useAppStore((state) => state.user);
    const { theme, setTheme } = useTheme();
    const { language, setLanguage } = useLanguage();
    const t = useT();
    const [notifications, setNotifications] = useState({
        taskUpdates: true,
        teamMentions: true,
        commentReplies: true,
        dailyDigest: false,
    });
    const [preferences, setPreferences] = useState({
        compactView: false,
    });
    return (<div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('settings.title')}</h1>
        <p className="text-muted-foreground">{t('settings.subtitle')}</p>
      </div>

      <div className="space-y-6">
        {/* Account Section */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Lock size={20}/>
            {t('settings.account')}
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
              <div>
                <p className="font-medium text-sm">{user === null || user === void 0 ? void 0 : user.name}</p>
                <p className="text-xs text-muted-foreground">{user === null || user === void 0 ? void 0 : user.email}</p>
              </div>
              <ChevronRight size={20} className="text-muted-foreground"/>
            </div>
            <p className="text-xs text-muted-foreground">Last login: Just now</p>
          </div>
        </Card>

        {/* Notifications Section */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Bell size={20}/>
            {t('settings.notifications')}
          </h2>
          <div className="space-y-3">
            {[
            { key: "taskUpdates", label: "Task Updates", description: "Get notified when tasks are updated" },
            { key: "teamMentions", label: "Team Mentions", description: "Alerts when you're mentioned in comments" },
            {
                key: "commentReplies",
                label: "Comment Replies",
                description: "Notify when someone replies to your comments",
            },
            { key: "dailyDigest", label: "Daily Digest", description: "Get a summary of project activity each day" },
        ].map(({ key, label, description }) => (<div key={key} className="flex items-start justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-sm">{label}</p>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </div>
                <button onClick={() => setNotifications((prev) => (Object.assign(Object.assign({}, prev), { [key]: !prev[key] })))} className={`px-3 py-1 rounded-full text-sm font-medium transition ${notifications[key]
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground"}`}>
                  {notifications[key] ? t('common.on') : t('common.off')}
                </button>
              </div>))}
          </div>
        </Card>

        {/* Preferences Section */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Eye size={20}/>
            {t('settings.preferences')}
          </h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium block mb-2">{t('settings.theme')}</label>
              <select value={theme || 'system'} onChange={(e) => setTheme(e.target.value)} className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground">
                <option value="light">{t('theme.light')}</option>
                <option value="dark">{t('theme.dark')}</option>
                <option value="system">{t('theme.system')}</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">{t('settings.language')}</label>
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground">
                <option value="en">{t('lang.en')}</option>
                <option value="es">{t('lang.es')}</option>
                <option value="fr">{t('lang.fr')}</option>
                <option value="de">{t('lang.de')}</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p className="font-medium text-sm">Compact View</p>
                <p className="text-xs text-muted-foreground">Reduce spacing in task lists</p>
              </div>
              <button onClick={() => setPreferences((prev) => (Object.assign(Object.assign({}, prev), { compactView: !prev.compactView })))} className={`px-3 py-1 rounded-full text-sm font-medium transition ${preferences.compactView ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                {preferences.compactView ? "On" : "Off"}
              </button>
            </div>
          </div>
        </Card>

        {/* Data & Privacy Section */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Database size={20}/>
            Data & Privacy
          </h2>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Heart size={16} className="mr-2"/>
              Download Your Data
            </Button>
            <p className="text-xs text-muted-foreground">Get a copy of all your data in a portable format</p>
          </div>
        </Card>

        {/* Logout Section */}
        <Card className="p-6 border-destructive/50">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <LogOut size={20} className="text-destructive"/>
            Logout
          </h2>
          <p className="text-sm text-muted-foreground mb-4">You will be logged out from all devices after logout</p>
          <Button onClick={onLogout} variant="destructive" className="w-full">
            Logout
          </Button>
        </Card>
      </div>
    </div>);
}
