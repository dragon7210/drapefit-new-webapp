import { useDispatch } from 'react-redux';
import { Typography, Button, Dialog, DialogTitle, DialogActions } from '@mui/material';
import PropTypes from 'prop-types';

const DeleteModal = ({ openDelete, handleDeleteDialog, deleteFunction }) => {
  const dispatch = useDispatch();
  return (
    <Dialog open={openDelete} onClose={handleDeleteDialog}>
      <DialogTitle>
        <Typography className="dialog-title">Are you sure to delete?</Typography>
      </DialogTitle>
      <DialogActions>
        <Button key="cancel" className="account-no-btn" onClick={handleDeleteDialog}>
          Cancel
        </Button>
        <Button
          key="submit"
          className="account-delete-btn"
          onClick={async () => {
            try {
              await dispatch(deleteFunction);
              handleDeleteDialog();
            } catch (err) {
              console.log(err?.message);
            }
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteModal.propTypes = {
  openDelete: PropTypes.bool,
  handleDeleteDialog: PropTypes.func,
  deleteFunction: PropTypes.func
};

export default DeleteModal;
