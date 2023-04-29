import { FC } from "react";
import { useFormContext, Controller } from "react-hook-form";

import {
  FormHelperText,
  Input,
  Typography,
  InputProps,
  FormControl,
} from "@mui/material";

type IFormInputProps = {
  name: string;
  label: string;
} & InputProps;

// The FormInput component is a functional component that accepts props from the IFormInputProps type.
const FormInput: FC<IFormInputProps> = ({ name, label, ...otherProps }) => {
  // The useFormContext hook is used to access the form context, which includes the control object
  // and the form state, including any errors.
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    // The Controller component is used to connect the input field to the form context.
    <Controller
      control={control}
      defaultValue=""
      name={name}
      render={({ field }) => (
        // The FormControl component is used to wrap the input field, providing
        // additional features such as error handling.
        <FormControl>
          <Typography>{label}</Typography>
          <Input
            {...field}
            fullWidth
            disableUnderline
            error={!!errors[name]}
            {...otherProps}
          />
          {/* The FormHelperText component is used to display validation error messages. */}
          <FormHelperText error={!!errors[name]}>
            {errors[name] ? (errors[name]?.message as unknown as string) : ""}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default FormInput;

// This code defines a custom FormInput component that wraps the input field and its label within a FormControl. The component uses the useFormContext hook from react-hook-form to access the form context, which includes the control object and the form state.

// The Controller component connects the input field to the form context, allowing it to manage the input state and validation. The Typography component displays the input label, and the Input component renders the actual input field.

// The FormHelperText component is used to display validation error messages. The error message is displayed if there is an error associated with the input field in the form state's errors object.
