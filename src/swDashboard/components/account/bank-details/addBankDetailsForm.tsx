
import { Box, FormGroup, TextField ,Button, Checkbox, FormControlLabel,Typography} from "@mui/material";
import { Field, Form, Formik ,ErrorMessage} from "formik";

import { AppDispatch, RootState} from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useRouter } from "next/router";
import { BankDetails,bankDetailsFormControls, bankDetailsSchema, bankDetailsSubmitHandler } from "@/lib/types/bank-details";
import { FormParams, createFormObject } from "@/lib/form";
import FormikContainer from "@/components/form/formikContainer";
import { updateUser } from "@/store/slices/userSlice";



export default function AddBankDetailsForm(){

  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const {_id} = useSelector((state:RootState)=>state.users.user)
      
  const initialValues :BankDetails={
      accountName:'',
      accountNumber:'',
      bankName:'',
      userId:_id,
      
    }

    //formik submit handler
    const formikSubmitHandler = (values:any,formikHelpers:any)=>{
  
      if(values.userId){
        return new Promise(res=>{
              formikHelpers.validateForm().then(async (data:any)=>{
                const msg = await bankDetailsSubmitHandler(values,router)
                dispatch(updateUser())
                  res(msg)
              }).catch((err:any)=>{
                console.log('Error from formik ',err)
                res(err)
              })              
        })
      }else{
        alert('Invalid request, Please provide UserId')
      }
  
    }
  
  
    const formParams:FormParams ={
      formObject : createFormObject(formikSubmitHandler,bankDetailsSchema,initialValues,bankDetailsFormControls),
      buttonLabel:'Add Bank Details',
      headerTitle:'Add Your Bank Details'
    }
      return(
          <FormikContainer formParams={formParams}/>
      )
  
}