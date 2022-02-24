import React,{useState, useEffect} from 'react';
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button} from "@material-ui/core";
import useStyles from "./styles.js";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import { commerce } from '../../../lib/commerce.js';
import {Link} from 'react-router-dom'
import { ContactSupportOutlined } from '@material-ui/icons';
const steps = ["Shipping Address", "Payment Details"];


const Checkout = ({cart, order, onCaptureCheckout, error, refreshCart}) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});

  useEffect(() => {
    if(cart.id){
      const generateToken = async () => {
        try {
          const token = await commerce.checkout.generateToken(cart.id, {type : 'cart'});
          setCheckoutToken(token);
        } catch(error) {
          console.log(error);
          }
      }
      generateToken();
    }
  }, [cart])



  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  let Confirmation = () => (order.customer ? (
    <>
      <div>
        <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
      </div>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
    </>
  ) : (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  ));
  
  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  const Form = () => {
    return(
    activeStep === 0? <AddressForm checkoutToken = {checkoutToken} next = {next}/> : <PaymentForm checkoutToken = {checkoutToken} backStep = {backStep} shippingData = {shippingData} onCaptureCheckout = {onCaptureCheckout} nextStep = {nextStep}/>
    )
  }

  return (
    <>
      <div className = {classes.toolbar}/>
      <main className = {classes.layout}>
        <Paper className = {classes.paper}>
        <Typography variant = "h4" align = "center">Checkout</Typography>
        <Stepper activeStep = {activeStep} className = {classes.stepper}>
          {steps.map(step => {return(
            <Step key = {step}>
              <StepLabel>{step}</StepLabel>
            </Step>)
          })}
        </Stepper>
        {activeStep === steps.length ? <Confirmation/> : checkoutToken && <Form/>}
        </Paper>
      </main>
    </>
  )
}

export default Checkout