import React from "react";
import { useFormikContext } from "formik";
import { Button } from "./Button";

export const FormResetButton = (props) => {
  const resetForm = useFormikContext().resetForm;

  return (
    <Button
      title={props.title}
      variant="TYPE1"
      style={props.style}
      onPress={() => {
        props.onPress ? props.onPress() : null;
        resetForm();
      }}
    />
  );
};
