import {
  FullScreenBubbleBackground,
  type FullScreenBubbleBackgroundTheme,
} from "@/registry/radix-nova/full-screen-bubble-background";

type Preview = {
  id: string;
  label: string;
  title: string;
  description: string;
  theme: FullScreenBubbleBackgroundTheme;
};

const previews: Preview[] = [
  {
    id: "auth",
    label: "Auth Surface",
    title: "Quiet editorial drift",
    description: "A broad, low-contrast field that works behind sign-in or onboarding content.",
    theme: {
      hue: 220,
      accentHue: 255,
    },
  },
  {
    id: "survey",
    label: "Survey Mode",
    title: "Themeable without rework",
    description:
      "Swap the palette for another product or campaign without rebuilding the layer model by hand.",
    theme: {
      hue: 154,
      accentHue: 194,
      saturation: 70,
      lightness: 76,
      opacity: 0.32,
      overlay: 0.18,
    },
  },
];

export function FullScreenBubbleBackgroundInteractiveExample() {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {previews.map((preview) => (
        <section
          key={preview.id}
          className="relative isolate overflow-hidden rounded-[1.75rem] border bg-card text-card-foreground shadow-sm"
        >
          <FullScreenBubbleBackground theme={preview.theme} />
          <div className="relative z-10 flex min-h-80 flex-col justify-between gap-8 p-6">
            <div className="flex flex-col gap-3">
              <div className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                {preview.label}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold tracking-tight">{preview.title}</h3>
                <p className="max-w-xs text-sm leading-6 text-muted-foreground">
                  {preview.description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/40 bg-white/55 px-4 py-3 backdrop-blur-sm">
              <div>
                <div className="text-sm font-medium">Reusable defaults</div>
                <div className="text-xs text-muted-foreground">Configurable hue and density</div>
              </div>
              <div className="text-xs text-muted-foreground">Builds on BubbleBackground</div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
