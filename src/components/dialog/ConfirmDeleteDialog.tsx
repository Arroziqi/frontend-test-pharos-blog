"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  postTitle: string;
}

export function ConfirmDeleteDialog({
  open,
  onClose,
  onConfirm,
  postTitle,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete this post?</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to permanently delete{" "}
          <strong>{postTitle}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" onClick={onConfirm} variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
