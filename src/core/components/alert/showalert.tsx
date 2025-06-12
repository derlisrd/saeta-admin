import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useState } from "react";

function ShowAlert({ error, title }: { error: Error | null | undefined, title: string }) {
    const [open, setOpen] = useState(true);

    if (error) {
        return <Dialog open={open} onClose={() => setOpen(false)} disableRestoreFocus >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Typography>{error.message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} autoFocus>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    }

    return <></>
}

export default ShowAlert;