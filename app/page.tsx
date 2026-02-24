import registry from "@/registry.json";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { Button } from "@/registry/radix-nova/button";
import {
	AlertDialogInteractiveExample,
	ConfirmDialogInteractiveExample,
	LoadingButtonInteractiveExample,
} from "./interactive-examples";

const hostedBaseUrl = "https://coneno.github.io/c-ui/r";
const supportedStyle = "radix-nova";
const registryAlias = "@c-ui";
const registryTemplateUrl = `${hostedBaseUrl}/{style}/{name}.json`;
const registryIndexUrl = `${hostedBaseUrl}/${supportedStyle}/registry.json`;
const usageExamples: Record<string, string> = {
	"alert-provider": `import { Button } from "@/components/ui/button"
import { AlertDialogProvider, useAlert } from "@/components/c-ui/alert-provider"

function AlertAction() {
	const alert = useAlert()

	return (
		<Button
			onClick={() =>
				void alert({
					title: "Heads up",
					description: "Your changes were applied.",
					buttonLabel: "OK",
				})
			}
		>
			Open alert
		</Button>
	)
}

export function AlertExample() {
	return (
		<AlertDialogProvider>
			<AlertAction />
		</AlertDialogProvider>
	)
}`,
	"button": `import { Button } from "@/components/ui/button"

export function ButtonExample() {
	return (
		<div className="flex flex-wrap gap-3">
			<Button>Default</Button>
			<Button variant="outline">Outline</Button>
		</div>
	)
}`,
	"confirm": `import { Button } from "@/components/ui/button"
import { ConfirmDialogProvider, useConfirm } from "@/components/c-ui/confirm-provider"

function DeleteAction() {
	const confirm = useConfirm()

	return (
		<Button
			variant="destructive"
			onClick={async () => {
				const confirmed = await confirm({
					title: "Delete item?",
					description: "This action cannot be undone.",
					confirmButtonText: "Delete",
					variant: "destructive",
				})

				if (confirmed) {
					// perform destructive action
				}
			}}
		>
			Delete item
		</Button>
	)
}

export function ConfirmExample() {
	return (
		<ConfirmDialogProvider>
			<DeleteAction />
		</ConfirmDialogProvider>
	)
}`,
	"loading-button": `import { LoadingButton } from "@/components/c-ui/loading-button"
import { useState } from "react"

export function SubmitAction() {
	const [isLoading, setIsLoading] = useState(false)

	const submit = async () => {
		setIsLoading(true)
		await new Promise((resolve) => setTimeout(resolve, 1200))
		setIsLoading(false)
	}

	return (
		<LoadingButton isLoading={isLoading} onClick={() => void submit()}>
			{isLoading ? "Submitting..." : "Submit"}
		</LoadingButton>
	)
}`,
};

export default function Home() {
	const configureRegistriesJson = `{
  "style": "${supportedStyle}",
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
				<p className="text-sm text-muted-foreground">
					This registry currently supports only <code>{supportedStyle}</code>. In the
					importing project, set <code>{`"style": "${supportedStyle}"`}</code> in{" "}
					<code>components.json</code> before installing components.
				</p>
				<p className="text-sm">
					Registry index:{" "}
					<a className="underline underline-offset-4" href={registryIndexUrl}>
						{registryIndexUrl}
					</a>
				</p>
			</div>

			<section className="mt-8 rounded-lg border bg-card p-4 text-card-foreground">
				<h2 className="text-lg font-medium">1. Configure style and registries in components.json</h2>
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
					const directUrlCommand = `npx shadcn@latest add ${hostedBaseUrl}/${supportedStyle}/${item.name}.json`;
					const usageExample = usageExamples[item.name];
					const hasLivePreview = ["alert-provider", "button", "confirm", "loading-button"].includes(
						item.name
					);

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
								{hasLivePreview ? (
									<div>
										<p className="mb-2 text-sm text-muted-foreground">
											Live preview
										</p>
										<div className="rounded-md border p-3">
											{item.name === "button" ? (
												<div className="flex flex-wrap gap-3">
													<Button>Default</Button>
													<Button variant="outline">Outline</Button>
												</div>
											) : null}
											{item.name === "alert-provider" ? <AlertDialogInteractiveExample /> : null}
											{item.name === "confirm" ? <ConfirmDialogInteractiveExample /> : null}
											{item.name === "loading-button" ? <LoadingButtonInteractiveExample /> : null}
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
