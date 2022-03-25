import React from "react";
import { useFormikContext } from "formik";
import { Button } from "./Button";

export const FormSubmitButton = (props) => {
  const handleSubmit = !props.onPress
    ? useFormikContext().handleSubmit
    : props.onPress;
  return (
    <Button
      title={props.title}
      variant="TYPE2"
      style={props.style}
      onPress={handleSubmit}
    />
  );
};
