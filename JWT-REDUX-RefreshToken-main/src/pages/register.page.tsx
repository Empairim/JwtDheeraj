import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { styled } from "@mui/material/styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Container, Box, Typography } from "@mui/material";
import { LoadingButton as _LoadingButton } from "@mui/lab";
import { useRegisterUserMutation } from "../redux/api/authApi";
import FormInput from "../components/FormInput";

const LoadingButton = styled(_LoadingButton)`
  background-color: black;
`;

// Define the validation schema for the registration form using Zod
const registerSchema = object({
  name: string().min(1, "Full name is required").max(100),
  email: string()
    .min(1, "Email is required")
    .email("Email address is not valid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be of 8 characters long")
    .max(32, "Must be less than 30 characters"),
  passwordConfirm: string().min(1, "Password is required"),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Passwords do not match!",
});

export type RegisterInput = TypeOf<typeof registerSchema>;

const RegisterPage = () => {
  // Initialize the form using react-hook-form and the Zod schema for validation
  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  // Set up the mutation to register a user and handle the result
  const [registerUser, { isLoading, isSuccess, error, isError, data }] =
    useRegisterUserMutation();
  const navigate = useNavigate();
  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  // Handle success and error responses from the API
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      navigate("/verifyemail");
    }
    if (isError) {
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.array.forEach((element: any) => {
          toast.error(element.message, { position: "top-right" });
        });
      } else {
        toast.error((error as any).data.message, { position: "top-right" });
      }
    }
  }, [isLoading]);

  // Reset the form if the submission was successful
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, []);

  // Handle form submission
  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    registerUser(values);
  };

  // Render the registration form
  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#2363eb",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography>Welcome to my Registration</Typography>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <FormInput name="name" label="full name"></FormInput>
            <FormInput
              name="email"
              type="email"
              label="enter the email"
            ></FormInput>
            <FormInput
              name="password"
              type="password"
              label="enter the password"
            ></FormInput>
            <FormInput
              name="passwordConfirm"
              type="password"
              label="confirm the password"
            ></FormInput>

            <LoadingButton
              variant="contained"
              loading={isLoading}
              disableElevation
              fullWidth
            >
              Sign Up
            </LoadingButton>
            <button>click</button>
          </form>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default RegisterPage;

//   In this part of the code, the registration form is being rendered using the FormInput components, which are custom form input components that handle input validation and error display. Each input field is associated with its corresponding form field from the registerSchema.

// The LoadingButton component is used for the "Sign Up" button. It shows a loading indicator when the form is being submitted (isLoading is true) and becomes disabled to prevent multiple submissions.

// Finally, there is a <button> element for testing purposes. You can remove it if it's not needed.
