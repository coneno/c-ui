import { Button } from "@/registry/radix-nova/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/radix-nova/dialog";

export function DialogInteractiveExample() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent closeLabel="Close dialog">
        <DialogHeader>
          <DialogTitle>Profile updated</DialogTitle>
          <DialogDescription>
            This example uses custom close labels and the footer close button.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton closeLabel="Dismiss" />
      </DialogContent>
    </Dialog>
  );
}
