import { React, useState, useContext } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { AnimeTriviaGameContext } from '../../contexts/AnimeTriviaGameContext';

const About = function () {
    const { dialog } = useContext(AnimeTriviaGameContext);


    const handleClose = function () {
        dialog.about.update(false);
    }

    return (
        <Dialog
            open={dialog.about.value}
            onClose={handleClose}
        >
            <DialogTitle>
                About
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    about
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

export default About;