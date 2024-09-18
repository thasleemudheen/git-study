import React, { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import AxiosInstance from '../AxiosInstance';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500, 
    bgcolor: 'background.paper',
    borderRadius: '10px', 
    boxShadow: 24,
    p: 4,
    outline: 'none',
  };
export default function ModalForDetails({ showModal, closeModal, details }) {
  const [amounts,setAmount]=useState('')
  const [totalPayment,setTotalPayment]=useState(0)
console.log(totalPayment)
  const {organizationName,description,amount,phoneNumber}=details ||{}
  const handleInputChange = (e) => {
    setAmount(e.target.value);
  };

  useEffect(()=>{
    const fetchPayments=async()=>{
      const response=await AxiosInstance.get(`/totalPayment/${organizationName}`,{
        withCredentials:true
      })
      setTotalPayment(response.data.totalPayments)
    }
    fetchPayments();
  },[organizationName])

  useEffect(() => {
    const loadRazorpayScript = () => {
      if (!window.Razorpay) {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => {
          console.log('Razorpay script loaded');
        };
        script.onerror = () => {
          console.error('Razorpay script failed to load');
        };
        document.body.appendChild(script);
      }
    };
    loadRazorpayScript();
  }, []);

 const balanceAmount=amount-totalPayment
  const handleRazorpayPayment =async() => {
    if (!amounts || isNaN(amounts)) {
      alert('Please enter a valid amount');
      return;
    }
    try {
      const response = await AxiosInstance.post('/payamount', {
        amount: amounts * 100 ,organizationName},{withCredentials:true}, // Convert to paise (smallest currency unit)
     );
      console.log('response from the backendd',response.data)
      const { order_id } = response.data; // Ensure backend returns `order_id`

      // Step 2: Define Razorpay payment options
      const options = {
        key: 'rzp_test_DI8wJzrsDmqhL7', // Replace with your Razorpay Key ID
        amount: amounts * 100, // Razorpay expects the amount in paise (multiply by 100)
        currency: 'INR',
        name: organizationName || 'Organization Name',
        description: description || 'No description available.',
        order_id: order_id, // Include the order ID generated by backend
        handler: function (response) {
          // alert('Payment successful! Razorpay Payment ID: ' + response.razorpay_payment_id);
          closeModal(); // Close the modal after successful payment
        },
        prefill: {
          contact: phoneNumber || '',
        },
        theme: {
          color: '#1976d2',
        },
      };

      // Step 3: Initialize Razorpay payment window and open it
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error)
    }
  }
 

  return (
    <Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    open={showModal}
    onClose={closeModal}
    closeAfterTransition
    slots={{ backdrop: Backdrop }}
    slotProps={{
      backdrop: {
        timeout: 500,
      },
    }}
  >
    <Fade in={showModal}>
      <Box sx={style}>
        <Typography
          id="transition-modal-title"
          variant="h5"
          component="h2"
          sx={{ fontWeight: 'bold', mb: 2 }}
        >
          {organizationName || 'Organization Name'}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography
          id="transition-modal-description"
          sx={{ mb: 2, color: 'text.secondary' }}
          variant="body1"
        >
          {description || 'No description available.'}
        </Typography>

        <Typography
          id="transition-modal-phone"
          sx={{ mb: 1, fontWeight: 'medium' }}
          variant="body2"
        >
          <strong>Phone Number:</strong> {phoneNumber || 'N/A'}
        </Typography>

        <Typography
          id="transition-modal-amount"
          sx={{ mb: 2, fontWeight: 'medium' }}
          variant="body2"
        >
          <strong>Donation Total Amount:</strong> {amount}
        </Typography>

        <Typography
          id="transition-modal-amount"
          sx={{ mb: 2, fontWeight: 'medium' }}
          variant="body2"
        >
          <strong>Balance Amount:{balanceAmount}</strong> 
        </Typography>

        <Divider sx={{ mt: 2, mb: 2 }} />
        <TextField
            label="Enter Custom Amount"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={amounts} 
            onChange={handleInputChange} 
          />
<div className='flex justify-center'>
<Button
        
          variant="contained"
          onClick={handleRazorpayPayment}
          sx={{ mt: 2, backgroundColor: '#1976d2', color: 'white' }}
        >
          PayNow
        </Button>

</div>
       
      </Box>
    </Fade>
  </Modal>
  );
}
