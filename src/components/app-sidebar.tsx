"use client";
import {
  CreditCardIcon,
  FolderOpenIcon,
  HistoryIcon,
  KeyIcon,
  LogOutIcon,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { useHasActiveSubscription } from "@/features/subscription/hooks/use-subsription";
import { toast } from "sonner";

const menuItems = [
  {
    title: "main",
    items: [
      {
        title: "Workflows",
        icon: FolderOpenIcon,
        url: "/workflows",
      },
      {
        title: "Credentials",
        icon: KeyIcon,
        url: "/credentials",
      },
      {
        title: "Executions",
        icon: HistoryIcon,
        url: "/executions",
      },
    ],
  },
];

export const AppSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { hasActiveSubscription, isLoading } = useHasActiveSubscription();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="h-10 px-4 gap-x-4">
            <Link href="/workflows" prefetch>
              <Image
                src="/logo/logo.svg"
                alt="Flowmind"
                width={30}
                height={30}
              />
              <span className="text-sm font-semibold">Flowmind</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>

      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={
                        item.url === "/"
                          ? pathname === "/"
                          : pathname.startsWith(item.url)
                      }
                      tooltip={item.title}
                      asChild
                      className="h-10 px-4 gap-x-4"
                    >
                      <Link href={item.url} prefetch>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          {!isLoading && !hasActiveSubscription && (
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Upgrade to Pro"
                className="h-10 px-4 gap-x-4"
                onClick={() => {
                  authClient.checkout({ slug: "Flowmind-Pro" });
                }}
              >
                <StarIcon className="size-4" />
                <span>Upgrade to Pro</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
          {!isLoading && hasActiveSubscription && (
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Billing Portal"
                className="h-10 px-4 gap-x-4"
                onClick={async () => {
                  try {
                    await authClient.customer.portal();
                  } catch (error: any) {
                    toast.error(
                      error?.message || "Failed to open billing portal"
                    );
                  }
                }}
              >
                <CreditCardIcon className="size-4" />
                <span>Billing Portal</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Sign Out"
              className="h-10 px-4 gap-x-4"
              onClick={async () => {
                const result = await authClient.signOut();
                if (result) {
                  router.push("/login");
                }
              }}
            >
              <LogOutIcon className="size-4" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
