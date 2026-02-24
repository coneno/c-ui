"use client";

import { useState } from "react";
import { AlertDialogProvider, useAlert } from "@/registry/radix-nova/alert-provider";
import { Button } from "@/registry/radix-nova/button";
import { ConfirmDialogProvider, useConfirm } from "@/registry/radix-nova/confirm-provider";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/registry/radix-nova/dialog";
import { LoadingButton } from "@/registry/radix-nova/loading-button";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function AlertExampleContent() {
	const alert = useAlert();
	const [status, setStatus] = useState("No alert shown yet.");

	const openAlert = async () => {
		await alert({
			title: "Heads up",
			description: "This is an interactive alert demo.",
			buttonLabel: "Understood",
		});
		setStatus("Alert dismissed.");
	};

	return (
		<div className="space-y-2">
			<Button type="button" onClick={() => void openAlert()}>
				Open Alert
			</Button>
			<p className="text-xs text-muted-foreground">{status}</p>
		</div>
	);
}

function ConfirmExampleContent() {
	const confirm = useConfirm();
	const [status, setStatus] = useState("No decision yet.");

	const openConfirm = async () => {
		const isConfirmed = await confirm({
			title: "Delete item?",
			description: "This action cannot be undone.",
			confirmButtonText: "Delete",
			cancelButtonText: "Cancel",
			variant: "destructive",
			requireConfirmationInput: {
				confirmTerm: "DELETE",
				hint: "Type DELETE to enable the button.",
			},
		});
		setStatus(isConfirmed ? "Confirmed." : "Cancelled.");
	};

	return (
		<div className="space-y-2">
			<Button type="button" variant="destructive" onClick={() => void openConfirm()}>
				Open Confirm
			</Button>
			<p className="text-xs text-muted-foreground">{status}</p>
		</div>
	);
}

export function AlertDialogInteractiveExample() {
	return (
		<AlertDialogProvider>
			<AlertExampleContent />
		</AlertDialogProvider>
	);
}

export function ButtonInteractiveExample() {
	return (
		<div className="flex flex-wrap gap-3">
			<Button>Default</Button>
			<Button variant="outline">Outline</Button>
			<Button size="sm">Small</Button>
		</div>
	);
}

export function ConfirmDialogInteractiveExample() {
	return (
		<ConfirmDialogProvider>
			<ConfirmExampleContent />
		</ConfirmDialogProvider>
	);
}

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

export function LoadingButtonInteractiveExample() {
	const [isLoading, setIsLoading] = useState(false);
	const [count, setCount] = useState(0);

	const triggerLoading = async () => {
		setIsLoading(true);
		await wait(1200);
		setIsLoading(false);
		setCount((prev) => prev + 1);
	};

	return (
		<div className="space-y-2">
			<LoadingButton type="button" isLoading={isLoading} onClick={() => void triggerLoading()}>
				{isLoading ? "Submitting..." : "Submit"}
			</LoadingButton>
			<p className="text-xs text-muted-foreground">Completed: {count}</p>
		</div>
	);
}
