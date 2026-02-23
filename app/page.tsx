import registry from "@/registry.json";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";

const hostedBaseUrl = "https://coneno.github.io/c-ui/r";

export default function Home() {
	return (
		<main className="mx-auto min-h-screen w-full max-w-3xl px-4 py-10">
			<div className="space-y-3">
				<h1 className="text-3xl font-semibold tracking-tight">c-ui registry</h1>
				<p className="text-sm text-muted-foreground">
					Install components with shadcn using the commands below.
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

			<section className="mt-8 space-y-4">
				{registry.items.map((item) => {
					const addCommand = `npx shadcn@latest add ${hostedBaseUrl}/${item.name}.json`;

					return (
						<article
							key={item.name}
							className="rounded-lg border bg-card p-4 text-card-foreground"
						>
							<h2 className="text-lg font-medium">{item.title}</h2>
							<p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
							<div className="mt-3">
								<DynamicCodeBlock
									lang="bash"
									code={addCommand}
									codeblock={{ className: "my-0" }}
								/>
							</div>
						</article>
					);
				})}
			</section>
		</main>
	);
}
