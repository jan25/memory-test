import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import RefreshSharpIcon from '@material-ui/icons/RefreshSharp';
import Typography from '@material-ui/core/Typography';
import "./Info.css";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const Info = ({ showInfo, showReset, onReset }) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const renderResetBtn = () => {
    return (
      <div>
        <RefreshSharpIcon className="icons" onClick={onReset} />
      </div>
    );
  }

  const renderInfo = () => {
    return (
      <div>
        <InfoOutlinedIcon className="icons" onClick={() => setOpen(true)} />
        <Dialog onClose={handleClose} aria-labelledby="dialog-title" open={open}>
          <DialogTitle id="dialog-title" onClose={handleClose}>
            <InfoOutlinedIcon /> Info
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>This game is a memory test for your brain on how well it can store
             information for short term recollection.</Typography>
            <Typography gutterBottom variant="h6">Instructions</Typography>
            <Typography gutterBottom>
              1. Remember the layout of numbers given to you
            </Typography>
            <Typography gutterBottom>
              2. Click on number <b>1</b> to hide the numbers under cards
            </Typography>
            <Typography gutterBottom>
              3. Now click on cards in order of numbers as you've seen them before
            </Typography>
            <Typography gutterBottom>
              4. Continue (3) until all numbers are collected
            </Typography>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  if (showInfo) {
    return renderInfo();
  } else if (showReset) {
    return renderResetBtn();
  }
}

export default Info;