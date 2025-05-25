
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useAuth } from '@/hooks/useAuth';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Vote, 
  Users, 
  Settings, 
  Send,
  Eye,
  PlusCircle,
  BarChart3
} from 'lucide-react';

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
    title: "Analytics",
    url: "/management/analytics",
    icon: BarChart3,
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

  return (
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
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.url}
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
        <div className="text-xs text-muted-foreground">
          <p className="truncate">{user?.invisiboxEmail}</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
