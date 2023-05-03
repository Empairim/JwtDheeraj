import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { styled } from "@mui/material/styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import userEvent from "@testing-library/user-event";
import { Container, Box, Typography } from "@mui/material";
import { LoadingButton as _LoadingButton } from "@mui/lab";
import { useRegisterUserMutation } from "../redux/api/authApi";
import FormInput from "../components/FormInput";

const LoadingButton = styled(_LoadingButton)`
  background-color: black;
`;

const registerSchema = object({
  name: string().min(1, "Full name is required").max(100),
  email: string()
    .min(1, "Email is required")
    .email("Email address is not valid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Must be less than 32 characters"),
  passwordConfirm: string().min(1, "Password is required"),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: `Passwords do not match ! `,
});


const sleep = async (ms:number)=> new Promise((r)=>setTimeout(r,ms));

export type RegisterInput = TypeOf<typeof registerSchema>;

const RegisterPage = () => {
  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });
  const [registerUser, { isLoading, isSuccess, error, isError, data }] =
    useRegisterUserMutation();
  const navigate = useNavigate();
  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);            
      navigate("/verifyemail");
    }
  }, [isSuccess, data, navigate]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    registerUser(values)
      .unwrap()
      .then(() => {
        // handle success
      })
      .catch((error) => {
        if (error.status === 400 && Array.isArray(error.data?.error)) {
          error.data.error.forEach((element: any) => {
            toast.error(element.message, { position: "top-right" });
          });
        } else if (error?.data?.message) {
          toast.error(error.data.message, { position: "top-right" });
        } else {
          toast.error(error.message, { position: "top-right" });
        }
      });
  };

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
        <Typography> Welcome to my Registration</Typography>

        <FormProvider {...methods}>
          <Box
            component="form"
            noValidate
            width="100%"
            onSubmit={handleSubmit(onSubmitHandler)}
          >
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
              type="submit"
              variant="contained"
              loading={isLoading}
              disableElevation
              fullWidth
            >
              Sign Up
            </LoadingButton>
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default RegisterPage;
