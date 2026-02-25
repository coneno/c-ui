"use client"

import { useState } from "react"
import { AlertDialogProvider, useAlert } from "@/registry/radix-nova/alert-provider"
import { Button } from "@/registry/radix-nova/button"

function AlertExampleContent() {
  const alert = useAlert()
  const [status, setStatus] = useState("No alert shown yet.")

  const openAlert = async () => {
    await alert({
      title: "Heads up",
      description: "This is an interactive alert demo.",
      buttonLabel: "Understood",
    })
    setStatus("Alert dismissed.")
  }

  return (
    <div className="space-y-2">
      <Button type="button" onClick={() => void openAlert()}>
        Open Alert
      </Button>
      <p className="text-xs text-muted-foreground">{status}</p>
    </div>
  )
}

export function AlertDialogInteractiveExample() {
  return (
    <AlertDialogProvider>
      <AlertExampleContent />
    </AlertDialogProvider>
  )
}
