import { Button } from "@/registry/base-nova/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/base-nova/dialog";

export function DialogInteractiveExample() {
  return (
    <Dialog>
      <DialogTrigger render={<Button type="button" />}>Open Dialog</DialogTrigger>
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
