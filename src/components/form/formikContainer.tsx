import React from "react";
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { Form, Formik } from "formik";
import FormControl from "./formControl";
import { FormParams, getOptions } from "@/lib/form";
import RestartAltIcon from '@mui/icons-material/RestartAlt';

function FormikContainer({ formParams }: { formParams: FormParams }) {
  return (
    <Box sx={{ margin: "3rem 1rem" }}>
      <h4>{formParams.headerTitle}</h4>
      <Formik
        validationSchema={formParams.formObject.validationSchema}
        initialValues={formParams.formObject.initialValues}
        onSubmit={formParams.formObject.onSubmit} enableReinitialize
      >
        {({ values,touched, isSubmitting, isValid, isValidating }) => (
          <Form>
            {formParams.formObject.formControls.map((field, i) => (
              <FormControl
                key={i}
                control={field.control}
                name={field.name}
                label={field.label}
                type={field.type}
                checked={field.checked}
                fieldToCheckAgainst={field.fieldToCheckAgainst}
                values={values}
                touched={touched}
                required={field.required}
                helperText={field.helperText}
                autoComplete={field.autoComplete}
                valueOfFieldToCheckAgainst={field.valueOfFieldToCheckAgainst}
                
                options={getOptions(
                  field.name,
                  values[field.fieldToCheckAgainst as string],
                  field.options as any[]
                )}
              />
            ))}
           <Box sx={{display:'flex',alignItems:'center',justifyContent:'space-around',width:'100%'}}>
           <Button
              type="submit"
              variant="contained"
              disabled={!isValid || isValidating || isSubmitting}
              endIcon={formParams.endIcon}
              startIcon={formParams.startIcon}
              size="small"
            >
              {formParams.buttonLabel}
            </Button>
            <Button
              type="reset"
              variant="outlined" size="small"
              startIcon={<RestartAltIcon/>}
            >
             Reset
            </Button>
           </Box>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={isSubmitting}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            {/* <pre>{JSON.stringify(isSubmitting,null,4)}</pre>
              <pre>{JSON.stringify(isValidating,null,4)}</pre> */}
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default FormikContainer;
