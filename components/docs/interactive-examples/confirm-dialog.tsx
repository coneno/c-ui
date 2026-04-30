"use client"

import { useState } from "react"
import { Button } from "@/registry/radix-nova/button"
import { ConfirmDialogProvider, useConfirm } from "@/registry/radix-nova/confirm-provider"

function ConfirmExampleContent() {
  const confirm = useConfirm()
  const [status, setStatus] = useState("No decision yet.")

  const openConfirm = async () => {
    const isConfirmed = await confirm({
      title: "Delete item?",
      description: "This action cannot be undone.",
      variant: "destructive",
      requireConfirmationInput: {
        confirmTerm: "DELETE",
        hint: "Type DELETE to enable the button.",
      },
    })
    setStatus(isConfirmed ? "Confirmed." : "Cancelled.")
  }

  return (
    <div className="space-y-2">
      <Button type="button" variant="destructive" onClick={() => void openConfirm()}>
        Open Confirm
      </Button>
      <p className="text-xs text-muted-foreground">{status}</p>
    </div>
  )
}

export function ConfirmDialogInteractiveExample() {
  return (
    <ConfirmDialogProvider
      messages={{
        confirmButtonText: "Delete",
        cancelButtonText: "Keep item",
        getRequireConfirmationLabel: (confirmTerm) => `Type ${confirmTerm} to delete this item`,
      }}
    >
      <ConfirmExampleContent />
    </ConfirmDialogProvider>
  )
}
