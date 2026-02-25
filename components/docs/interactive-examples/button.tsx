import { Button } from "@/registry/radix-nova/button"

export function ButtonInteractiveExample() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button>Default</Button>
      <Button variant="outline">Outline</Button>
      <Button size="sm">Small</Button>
    </div>
  )
}
