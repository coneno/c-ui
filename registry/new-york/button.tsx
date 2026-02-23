import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type CuiButtonProps = React.ComponentProps<typeof Button>

const CuiButton = React.forwardRef<HTMLButtonElement, CuiButtonProps>(
    ({ className, ...props }, ref) => {
        return (
            <Button
                ref={ref}
                className={cn(
                    "active:scale-[0.97] transition-transform duration-150",
                    className
                )}
                {...props}
            />
        )
    }
)

CuiButton.displayName = "Button"

export { CuiButton as Button }
