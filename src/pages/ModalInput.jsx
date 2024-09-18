import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalInput({ handleFormSubmit, handleClose, showModalopen }) {
  // Form state
//   const [open, setOpen] = useState(false);
  const [organizationName, setOrganizationName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [description, setDescription] = useState('');
  const [amount,setAmount]=useState('')

  // Validation state
  const [errors, setErrors] = useState({});

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

  const validateForm = () => {
    const newErrors = {};
    if (!organizationName.trim()) {
      newErrors.organizationName = 'Organization name is required';
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits';
    }
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    if(!amount.trim()){
        newErrors.amount='the amount is required'
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = { organizationName, phoneNumber, description,amount };
      handleFormSubmit(formData);
         handleClose()
    }
  };

  return (
    <div>
      <Modal
        open={showModalopen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Fund Raise Details
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              id="organization-name"
              label="Organization Name"
              variant="standard"
              fullWidth
              margin="normal"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              error={!!errors.organizationName}
              helperText={errors.organizationName}
            />
            <TextField
              id="phone-number"
              label="Phone Number"
              variant="standard"
              fullWidth
              margin="normal"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
            />
            <TextField
              id="description"
              label="Description"
              variant="standard"
              fullWidth
              multiline
              rows={3}
              margin="normal"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              error={!!errors.description}
              helperText={errors.description}
            />
             <TextField
              id="amount"
              label="amount"
              variant="standard"
              fullWidth
              multiline
              margin="normal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              error={!!errors.amount}
              helperText={errors.amount}
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
