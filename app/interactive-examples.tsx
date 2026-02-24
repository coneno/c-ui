"use client";

import { useState } from "react";
import { Button } from "@/registry/radix-nova/button";
import { AlertDialogProvider, useAlert } from "@/registry/radix-nova/alert-provider";
import { ConfirmDialogProvider, useConfirm } from "@/registry/radix-nova/confirm-provider";
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

	const openAlert2 = async () => {
		await alert({
			title: "Heads up 2",
			description: "This is an interactive alert demo 2.",
			buttonLabel: "Alright",
			dismissButtonVariant: "outline",
			dismissButtonClassName: "min-w-32",
		});
		setStatus("Alert 2 dismissed.");
	};

	return (
		<div className="space-y-2">
			<div className="flex flex-row gap-2">
				<Button type="button" onClick={() => void openAlert()}>
					Open Alert
				</Button>
				<Button type="button" onClick={() => void openAlert2()}>
					Open Alert 2
				</Button>
			</div>
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

export function ConfirmDialogInteractiveExample() {
	return (
		<ConfirmDialogProvider>
			<ConfirmExampleContent />
		</ConfirmDialogProvider>
	);
}

export function LoadingButtonInteractiveExample() {
	const [isLoading, setIsLoading] = useState(false);
	const [count, setCount] = useState(0);

	const triggerLoading = async () => {
		setIsLoading(true);
		await wait(1400);
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
