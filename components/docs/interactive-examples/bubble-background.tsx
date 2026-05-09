import {
  BubbleBackground,
  DEFAULT_BUBBLE_VIGNETTE,
  type BubbleBackgroundBubble,
  type BubbleBackgroundLayer,
} from "@/registry/radix-nova/bubble-background";

const showcaseMotion = {
  driftMinMs: 32_000,
  driftMaxMs: 54_000,
  waypoints: 4,
  overshoot: 0.24,
} as const;

function bubble(
  id: string,
  initialX: number,
  initialY: number,
  width: number,
  color: string,
  highlightColor: string,
  opacity: number,
  heightRatio = 1,
): BubbleBackgroundBubble {
  return {
    id,
    initialX,
    initialY,
    width,
    height: width * heightRatio,
    color,
    highlightColor,
    opacity,
  };
}

type BubbleBackgroundPreview = {
  id: string;
  label: string;
  title: string;
  description: string;
  layers: BubbleBackgroundLayer[];
};

const previews: BubbleBackgroundPreview[] = [
  {
    id: "editorial",
    label: "Auth Surface",
    title: "Quiet editorial drift",
    description: "A broad, low-contrast field that works behind sign-in or onboarding content.",
    layers: [
      {
        id: "editorial-base",
        backdrop: [
          "radial-gradient(circle at 14% 16%, hsl(198 76% 96% / 0.92), transparent 40%)",
          "radial-gradient(circle at 84% 76%, hsl(332 62% 94% / 0.72), transparent 44%)",
          "linear-gradient(180deg, hsl(210 38% 98%), hsl(328 34% 95%))",
        ].join(","),
        overlay: "linear-gradient(180deg, hsl(0 0% 100% / 0.08), hsl(220 30% 98% / 0.24))",
        vignette: DEFAULT_BUBBLE_VIGNETTE,
        blur: 70,
        motion: showcaseMotion,
        bubbles: [
          bubble(
            "editorial-1",
            0.12,
            0.18,
            340,
            "hsl(198 88% 78%)",
            "hsl(198 96% 90%)",
            0.34,
            1.18,
          ),
          bubble("editorial-2", 0.7, 0.28, 280, "hsl(340 84% 82%)", "hsl(338 92% 92%)", 0.28, 0.88),
          bubble("editorial-3", 0.42, 0.78, 420, "hsl(248 72% 82%)", "hsl(248 86% 92%)", 0.22, 1.1),
        ],
      },
    ],
  },
  {
    id: "survey",
    label: "Survey Mode",
    title: "Themeable without rework",
    description:
      "Swap palettes and keep the same layer structure when another product needs a different mood.",
    layers: [
      {
        id: "survey-base",
        backdrop: [
          "radial-gradient(circle at 18% 20%, hsl(145 70% 94% / 0.88), transparent 42%)",
          "radial-gradient(circle at 80% 22%, hsl(196 74% 93% / 0.7), transparent 38%)",
          "linear-gradient(180deg, hsl(150 42% 97%), hsl(191 44% 93%))",
        ].join(","),
        overlay: "linear-gradient(180deg, hsl(0 0% 100% / 0.06), hsl(165 30% 98% / 0.18))",
        vignette: DEFAULT_BUBBLE_VIGNETTE,
        blur: 62,
        motion: showcaseMotion,
        bubbles: [
          bubble("survey-1", 0.16, 0.3, 260, "hsl(154 74% 72%)", "hsl(154 84% 86%)", 0.32, 1.16),
          bubble("survey-2", 0.66, 0.22, 220, "hsl(194 82% 72%)", "hsl(194 90% 86%)", 0.28, 0.92),
          bubble("survey-3", 0.5, 0.72, 360, "hsl(171 66% 76%)", "hsl(171 80% 88%)", 0.24, 1.08),
        ],
      },
    ],
  },
  {
    id: "sidebar",
    label: "Sidebar Accent",
    title: "Compact ambient color",
    description:
      "A tighter composition for navigational chrome where the content still needs to read clearly.",
    layers: [
      {
        id: "sidebar-base",
        backdrop: [
          "radial-gradient(circle at 20% 16%, hsl(32 82% 95% / 0.84), transparent 42%)",
          "radial-gradient(circle at 82% 78%, hsl(16 86% 92% / 0.64), transparent 46%)",
          "linear-gradient(180deg, hsl(28 52% 97%), hsl(18 54% 93%))",
        ].join(","),
        overlay: "linear-gradient(180deg, hsl(0 0% 100% / 0.06), hsl(24 40% 97% / 0.2))",
        vignette: DEFAULT_BUBBLE_VIGNETTE,
        blur: 54,
        motion: showcaseMotion,
        bubbles: [
          bubble("sidebar-1", 0.24, 0.18, 200, "hsl(28 92% 74%)", "hsl(34 100% 88%)", 0.34, 1.12),
          bubble("sidebar-2", 0.7, 0.42, 260, "hsl(10 88% 76%)", "hsl(14 96% 88%)", 0.28, 0.94),
          bubble("sidebar-3", 0.44, 0.86, 220, "hsl(42 82% 78%)", "hsl(46 92% 88%)", 0.22, 1.04),
        ],
      },
    ],
  },
];

export function BubbleBackgroundInteractiveExample() {
  return (
    <div className="grid gap-4 xl:grid-cols-3">
      {previews.map((preview) => (
        <section
          key={preview.id}
          className="relative isolate overflow-hidden rounded-[1.75rem] border bg-card text-card-foreground shadow-sm"
        >
          <BubbleBackground layers={preview.layers} />
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
                <div className="text-sm font-medium">
                  {preview.layers[0]?.bubbles.length} bubbles
                </div>
                <div className="text-xs text-muted-foreground">
                  {preview.layers.length} layer composition
                </div>
              </div>
              <div className="text-xs text-muted-foreground">Reusable palette swap</div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
