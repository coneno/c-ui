import Link from "next/link";
import registry from "@/registry.json";

export function ComponentOverview() {
	return (
		<div className="not-prose grid gap-3 sm:grid-cols-2">
			{registry.items.map((item) => (
				<Link
					key={item.name}
					href={`/docs/components/${item.name}`}
					className="block rounded-lg border bg-card p-4 text-card-foreground no-underline transition-colors hover:bg-muted/50 hover:no-underline"
				>
					<div className="text-sm font-medium">{item.title}</div>
					<p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
				</Link>
			))}
		</div>
	);
}
