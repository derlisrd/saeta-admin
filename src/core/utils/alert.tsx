
import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Theme, createTheme, ThemeProvider } from "@mui/material";

type AlertType = "success" | "error" | "info" | "warning";

interface AlertButton {
    label: string;
    onClick?: () => void;
    autoClose?: boolean;
    value?: any;
    variant?: "text" | "outlined" | "contained";
    color?: "primary" | "secondary" | "error" | "info" | "warning" | "success";
}

interface AlertProps {
    title: string;
    message: string;
    type?: AlertType;
    timer?: number;
    buttons?: AlertButton[];
}

function AlertModal({
    title,
    message,
    timer,
    buttons,
    onResolve,
}: AlertProps & { onResolve: (result: any) => void }) {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        if (timer) {
            timeout = setTimeout(() => {
                setOpen(false);
                onResolve(null);
            }, timer);
        }
        return () => {
            if (timeout) clearTimeout(timeout);
        };
    }, [timer]);

    const handleClose = (value?: any) => {
        setOpen(false);
        onResolve(value);
    };

    return (
        <Dialog open={open} onClose={() => handleClose(null)} disableRestoreFocus >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Typography>{message}</Typography>
            </DialogContent>
            <DialogActions>
                {buttons?.map((btn, i) => (
                    <Button
                        key={i}
                        variant={btn.variant ?? "text"}
                        color={btn.color ?? "primary"}
                        onClick={() => {
                            btn.onClick?.();
                            if (btn.autoClose !== false) handleClose(btn.value ?? btn.label);
                        }}
                    >
                        {btn.label}
                    </Button>
                ))}
                {!buttons && !timer && (
                    <Button onClick={() => handleClose(true)} autoFocus
                    >
                        OK
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}

function getThemeFromLocalStorage(): Theme {
    const storedTheme = localStorage.getItem("customTheme");

    if (storedTheme) {
        try {
            const parsed = JSON.parse(storedTheme);
            return createTheme({ ...parsed });
        } catch (e) {
            console.warn("Error parsing customTheme from localStorage:", e);
        }
    }

    // fallback: default light theme
    return createTheme();
}

export function showAlert(props: AlertProps): Promise<any> {
    return new Promise((resolve) => {
        const container = document.createElement("div");
        document.body.appendChild(container);
        const root = createRoot(container);

        const onResolve = (result: any) => {
            root.unmount();
            container.remove();
            resolve(result);
        };
        const theme = getThemeFromLocalStorage();
        root.render(<ThemeProvider theme={theme}>
            <AlertModal {...props} onResolve={onResolve} />
        </ThemeProvider>);
    });
}
