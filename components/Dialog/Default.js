import { React, useState, useContext } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { AnimeTriviaGameContext } from '../../contexts/AnimeTriviaGameContext';
import GetDialogContent from './GetDialogContent';

const Default = function () {
    const { dialog } = useContext(AnimeTriviaGameContext);

    const title = GetDialogContent(dialog.dialogType).title
    const content = GetDialogContent(dialog.dialogType).content

    const handleClose = function () {
        dialog.update(false);
    }

    return (
        <Dialog
            open={dialog.value}
            onClose={handleClose}
        >
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default Default;