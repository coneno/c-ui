"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import ConfirmDialog, { type RequireConfirmationInput } from "./confirm-dialog";

export type { RequireConfirmationInput };

export interface ConfirmOptions {
	title?: string;
	description?: string;
	confirmButtonText?: string;
	cancelButtonText?: string;
	variant?: "default" | "destructive";
	requireConfirmationInput?: RequireConfirmationInput;
}

export interface ConfirmDialogMessages {
	title: string;
	description: string;
	confirmButtonText: string;
	cancelButtonText: string;
	requireConfirmationLabel: string;
}

export interface ConfirmDialogProviderProps {
	children: ReactNode;
	messages?: Partial<ConfirmDialogMessages>;
	defaultVariant?: ConfirmOptions["variant"];
}

interface ConfirmContextType {
	confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

const DEFAULT_CONFIRM_MESSAGES: ConfirmDialogMessages = {
	title: "Confirm Action",
	description: "Are you sure you want to proceed?",
	confirmButtonText: "Confirm",
	cancelButtonText: "Cancel",
	requireConfirmationLabel: "Type {{confirmTerm}} to confirm",
};

export const ConfirmDialogProvider = ({ children, messages, defaultVariant = "default" }: ConfirmDialogProviderProps) => {
	const [options, setOptions] = useState<ConfirmOptions>({});
	const [isOpen, setIsOpen] = useState(false);
	const [resolver, setResolver] = useState<((value: boolean) => void) | null>(null);
	const resolvedMessages = {
		...DEFAULT_CONFIRM_MESSAGES,
		...messages,
	};

	const confirm = useCallback((confirmOptions: ConfirmOptions) => {
		setResolver((prev: ((value: boolean) => void) | null) => {
			if (prev) {
				prev(false);
			}
			return null;
		});

		setOptions(confirmOptions);
		setIsOpen(true);
		return new Promise<boolean>((resolve) => {
			setResolver(() => resolve);
		});
	}, []);

	const handleConfirm = () => {
		if (resolver) {
			resolver(true);
		}
		setIsOpen(false);
		setResolver(null);
	};

	const handleCancel = () => {
		if (resolver) {
			resolver(false);
		}
		setIsOpen(false);
		setResolver(null);
	};

	return (
		<ConfirmContext.Provider value={{ confirm }}>
			{children}
			<ConfirmDialog
				isOpen={isOpen}
				title={options.title ?? resolvedMessages.title}
				description={options.description ?? resolvedMessages.description}
				confirmButtonText={options.confirmButtonText ?? resolvedMessages.confirmButtonText}
				cancelButtonText={options.cancelButtonText ?? resolvedMessages.cancelButtonText}
				variant={options.variant ?? defaultVariant}
				requireConfirmationInput={options.requireConfirmationInput}
				requireConfirmationLabel={resolvedMessages.requireConfirmationLabel}
				onConfirm={handleConfirm}
				onCancel={handleCancel}
			/>
		</ConfirmContext.Provider>
	);
};

export const useConfirm = () => {
	const context = useContext(ConfirmContext);
	if (!context) {
		throw new Error("useConfirm must be used within a ConfirmDialogProvider");
	}
	return context.confirm;
};
