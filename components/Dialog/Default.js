import { React, useState, useContext } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, styled } from "@mui/material";
import { AnimeTriviaGameContext } from '../../contexts/AnimeTriviaGameContext';
import GetDialogContent from './GetDialogContent';

const ButtonStyle = styled(Button)(({ theme }) => ({
    // backgroundColor: theme.palette[theme.palette.theme].primary.light,
    color: theme.palette[theme.palette.theme].primary.contrastText
}))


const Default = function () {
    const { dialog } = useContext(AnimeTriviaGameContext);

    // const title = GetDialogContent(dialog.dialogType).title
    // const content = GetDialogContent(dialog.dialogType).content

    const handleClose = function () {
        dialog.update(false);
    }

    return (
        <Dialog
            open={dialog.value}
            onClose={handleClose}
        >
            <DialogTitle>
                {GetDialogContent(dialog.dialogType).title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {GetDialogContent(dialog.dialogType).content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <ButtonStyle
                    onClick={handleClose}
                >
                    Close
                </ButtonStyle>
            </DialogActions>
        </Dialog>
    )
}

export default Default;