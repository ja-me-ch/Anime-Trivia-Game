import { React, useState, useContext } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { AnimeTriviaGameContext } from '../../contexts/AnimeTriviaGameContext';

const GettingStarted = function () {
    const { dialog } = useContext(AnimeTriviaGameContext);

    const handleClose = function () {
        dialog.gettingStarted.update(false);
    }

    return (
        <Dialog
            open={dialog.gettingStarted.value}
            onClose={handleClose}
        >
            <DialogTitle>
                Getting Started
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    getting started
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                >
                    Got it!
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default GettingStarted;