"use client";

import { useState } from "react";

import {
  SidebarBubbleBackground,
  type SidebarBubbleBackgroundTheme,
} from "@/registry/radix-nova/sidebar-bubble-background";
import { cn } from "@/lib/utils";

type PreviewRoute = {
  id: string;
  label: string;
  theme: SidebarBubbleBackgroundTheme;
};

type Preview = {
  id: string;
  label: string;
  title: string;
  description: string;
  routes: PreviewRoute[];
};

const previews: Preview[] = [
  {
    id: "study",
    label: "Study Sidebar",
    title: "Route-aware hue",
    description:
      "Stable theme keys crossfade to the next layout without rebuilding sidebar chrome.",
    routes: [
      { id: "overview", label: "Overview", theme: { key: "study-overview", hue: 28 } },
      {
        id: "participants",
        label: "Participants",
        theme: {
          key: "study-participants",
          hue: 102,
          hueSpread: 16,
          saturation: 74,
          lightness: 73,
          overlay: 0.52,
        },
      },
      {
        id: "messaging",
        label: "Messaging",
        theme: {
          key: "study-messaging",
          hue: 344,
          hueSpread: 24,
          saturation: 78,
          lightness: 69,
          opacity: 0.35,
          overlay: 0.56,
        },
      },
      {
        id: "settings",
        label: "Settings",
        theme: {
          key: "study-settings",
          hue: 212,
          hueSpread: 18,
          saturation: 68,
          lightness: 74,
          opacity: 0.34,
          overlay: 0.62,
        },
      },
    ],
  },
  {
    id: "operations",
    label: "Ops Sidebar",
    title: "A tighter ambient field",
    description:
      "Use the same component for admin, CRM, or internal tooling sidebars with a new palette.",
    routes: [
      {
        id: "queues",
        label: "Queues",
        theme: {
          key: "ops-queues",
          hue: 198,
          hueSpread: 26,
          saturation: 72,
          lightness: 68,
          opacity: 0.32,
          overlay: 0.5,
        },
      },
      {
        id: "cases",
        label: "Cases",
        theme: {
          key: "ops-cases",
          hue: 18,
          hueSpread: 20,
          saturation: 74,
          lightness: 70,
          opacity: 0.34,
          overlay: 0.48,
        },
      },
      {
        id: "exports",
        label: "Exports",
        theme: {
          key: "ops-exports",
          hue: 148,
          hueSpread: 18,
          saturation: 66,
          lightness: 72,
          opacity: 0.31,
          overlay: 0.46,
        },
      },
      {
        id: "integrations",
        label: "Integrations",
        theme: {
          key: "ops-integrations",
          hue: 248,
          hueSpread: 22,
          saturation: 70,
          lightness: 67,
          opacity: 0.33,
          overlay: 0.54,
        },
      },
    ],
  },
];

function SidebarBubbleBackgroundPreview({ preview }: { preview: Preview }) {
  const [activeRouteId, setActiveRouteId] = useState(preview.routes[0]?.id ?? "");
  const activeRoute =
    preview.routes.find((route) => route.id === activeRouteId) ?? preview.routes[0];

  if (!activeRoute) return null;

  return (
    <section className="relative isolate overflow-hidden rounded-[1.75rem] border bg-card text-card-foreground shadow-sm">
      <div className="relative min-h-96">
        <SidebarBubbleBackground theme={activeRoute.theme} />
        <div className="relative z-10 flex min-h-96 flex-col gap-6 p-5">
          <div className="space-y-1.5">
            <div className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              {preview.label}
            </div>
            <h3 className="text-lg font-semibold tracking-tight">{preview.title}</h3>
            <p className="text-sm leading-6 text-muted-foreground">{preview.description}</p>
          </div>

          <div className="mt-auto rounded-2xl border border-white/40 bg-white/55 p-3 backdrop-blur-sm">
            <p className="mb-2 px-1 text-xs text-muted-foreground">Click to switch theme</p>
            <div className="space-y-1">
              {preview.routes.map((route) => {
                const isActive = route.id === activeRoute.id;
                return (
                  <button
                    key={route.id}
                    type="button"
                    onClick={() => setActiveRouteId(route.id)}
                    aria-pressed={isActive}
                    className={cn(
                      "w-full rounded-xl border px-3 py-2 text-left text-sm font-medium transition-[background-color,border-color,box-shadow] duration-200",
                      isActive
                        ? "border-white/80 bg-white/80 shadow-sm"
                        : "border-transparent bg-white/20 hover:border-white/50 hover:bg-white/40",
                    )}
                  >
                    {route.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SidebarBubbleBackgroundInteractiveExample() {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {previews.map((preview) => (
        <SidebarBubbleBackgroundPreview key={preview.id} preview={preview} />
      ))}
    </div>
  );
}
