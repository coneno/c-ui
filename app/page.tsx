import registry from "@/registry.json";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { Button as ShadcnButton } from "@/components/ui/button";
import { Button as AnimatedButton } from "@/registry/new-york/button";

const hostedBaseUrl = "https://coneno.github.io/c-ui/r";
const registryAlias = "@c-ui";
const registryTemplateUrl = `${hostedBaseUrl}/{name}.json`;
const usageExamples: Record<string, string> = {
	button: `import { Button as ShadcnButton } from "@/components/ui/button"
import { Button as AnimatedButton } from "@/components/c-ui/button"

export function ButtonComparison() {
	return (
		<div className="flex flex-wrap gap-3">
			<ShadcnButton>shadcn/ui Button</ShadcnButton>
			<AnimatedButton>Animated Button</AnimatedButton>
		</div>
	)
}`,
	"loading-button": `import { LoadingButton } from "@/components/c-ui/loading-button"

export function SubmitAction() {
	return <LoadingButton isLoading>Submitting</LoadingButton>
}`,
};

export default function Home() {
	const configureRegistriesJson = `{
  "registries": {
    "${registryAlias}": "${registryTemplateUrl}"
  }
}`;

	return (
		<main className="mx-auto min-h-screen w-full max-w-3xl px-4 py-10">
			<div className="space-y-3">
				<h1 className="text-3xl font-semibold tracking-tight">c-ui registry</h1>
				<p className="text-sm text-muted-foreground">
					Configure this registry once, then install components via{" "}
					<code>{registryAlias}/&lt;component&gt;</code>.
				</p>
				<p className="text-sm">
					Registry index:{" "}
					<a
						className="underline underline-offset-4"
						href={`${hostedBaseUrl}/registry.json`}
					>
						{`${hostedBaseUrl}/registry.json`}
					</a>
				</p>
			</div>

			<section className="mt-8 rounded-lg border bg-card p-4 text-card-foreground">
				<h2 className="text-lg font-medium">1. Configure registries in components.json</h2>
				<p className="mt-1 text-sm text-muted-foreground">
					Add this once in your consumer project:
				</p>
				<div className="mt-3">
					<DynamicCodeBlock
						lang="json"
						code={configureRegistriesJson}
						codeblock={{ className: "my-0" }}
					/>
				</div>
			</section>

			<section className="mt-6 space-y-4">
				{registry.items.map((item) => {
					const addCommand = `npx shadcn@latest add ${registryAlias}/${item.name}`;
					const directUrlCommand = `npx shadcn@latest add ${hostedBaseUrl}/${item.name}.json`;
					const usageExample = usageExamples[item.name];
					const isButtonItem = item.name === "button";

					return (
						<article
							key={item.name}
							className="rounded-lg border bg-card p-4 text-card-foreground"
						>
							<h2 className="text-lg font-medium">{item.title}</h2>
							<p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
							<div className="mt-3 space-y-3">
								<DynamicCodeBlock
									lang="bash"
									code={addCommand}
									codeblock={{ className: "my-0" }}
								/>
								<details className="text-xs mt-2 ps-4">
									<summary className="cursor-pointer text-muted-foreground">
										Direct URL install
									</summary>
									<div className="mt-1">
										<DynamicCodeBlock
											lang="bash"
											code={directUrlCommand}
											codeblock={{ className: "my-0" }}
										/>
									</div>
								</details>
								{isButtonItem ? (
									<div>
										<p className="mb-2 text-sm text-muted-foreground">
											Live preview (press and hold each button)
										</p>
										<div className="flex flex-wrap gap-3 rounded-md border p-3">
											<ShadcnButton>shadcn/ui Button</ShadcnButton>
											<AnimatedButton>Animated Button</AnimatedButton>
										</div>
									</div>
								) : null}
								{usageExample ? (
									<div>
										<p className="mb-2 text-sm text-muted-foreground">Usage</p>
										<DynamicCodeBlock
											lang="tsx"
											code={usageExample}
											codeblock={{ className: "my-0" }}
										/>
									</div>
								) : null}
							</div>
						</article>
					);
				})}
			</section>
		</main>
	);
}
