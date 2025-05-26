
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter, } from "@/components/ui/sidebar";
import { useAuth } from '@/hooks/useAuth';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, LogOut, MessageSquare, Vote, Users, Settings, Send, Eye, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLogoutMutation } from '@/hooks/useAuthMutations';
import { LogoutConfirmDialog } from '@/components/LogoutConfirmDialog';
import { useState } from 'react';

const menuItems = [
  {
    title: "Dashboard",
    url: "/management/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Send Message",
    url: "/management/send-message",
    icon: Send,
  },
  {
    title: "View Messages",
    url: "/management/messages",
    icon: MessageSquare,
  },
  {
    title: "Create Poll",
    url: "/management/create-poll",
    icon: PlusCircle,
  },
  {
    title: "View Polls",
    url: "/management/polls",
    icon: Vote,
  },
  {
    title: "Manage Subscribers",
    url: "/management/subscribers",
    icon: Users,
  },
  {
    title: "Settings",
    url: "/management/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { user } = useAuth();
  const location = useLocation();
  const logoutMutation = useLogoutMutation();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleLogoutConfirm = () => {
    logoutMutation.mutate();
    setShowLogoutConfirm(false);
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <>
      <Sidebar>
        <SidebarHeader className="border-b p-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">I</span>
            </div>
            <div>
              <h2 className="font-semibold text-sm">InvisiBox</h2>
              <p className="text-xs text-muted-foreground truncate">
                {user?.companyName}
              </p>
            </div>
          </div>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Management</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title} className="my-1">
                    <SidebarMenuButton 
                      asChild
                      isActive={location.pathname === item.url}
                      className={`${location.pathname === item.url ? '!bg-purple-600 !text-white/80' : 'text-muted-foreground'}`}
                    >
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        
        <SidebarFooter className="border-t p-4">
          <div className="flex flex-col items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogoutClick}
              disabled={logoutMutation.isPending}
              className="flex w-max items-center space-x-1 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-gray-900 dark:text-gray-100"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>

      <LogoutConfirmDialog
        isOpen={showLogoutConfirm}
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
        isLoading={logoutMutation.isPending}
      />
    </>
  );
}
