import React from 'react'
import {TextField, Grid} from '@material-ui/core';
import {useFormContext, Controller} from 'react-hook-form';

const FormInput = ({name, label}) => {
  const {control} = useFormContext();

  return (
    <Grid item xs = {12} sm = {6}>
    <Controller
            defaultValue = ""
            control={control}
            name={name}
            render = {({ field : {onChange, value}})=> (
                <TextField
                    onChange = {onChange}
                    fullWidth
                    label={label}
                    value = {value}
                />
            )}
         />
    </Grid>
  );
}

export default FormInput