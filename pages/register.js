import React, { useEffect } from 'react'
import styles from '../styles/Register.module.css'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useCreateUserMutation } from '../stores/services/userApiSlice';
import { saveCookie } from '../helpers';
import { useRouter } from 'next/router';
const theme = createTheme();
const Register = () => {
  const SignupSchema = yup.object().shape({
    first_name: yup.string()
      .required("Firstname is required"),
    last_name: yup.string()
      .required("Lastname is required"),
    email: yup.string()
      .required("Email is required")
      .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Email is not valid"),
    password: yup.string().required("Password is required"),
  });
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(SignupSchema)
  });
  const [
    userRegister,
    {
      data,
      error,
      isLoading,
      isSuccess,
      isError,
    }
  ] = useCreateUserMutation()
  const onSubmit = async data => {
    const userRegisterData = await userRegister({
      name: `${data.first_name} ${data.last_name}`,
      email: data.email,
      password: data.password,

    })
  };
  const router = useRouter()
  useEffect(() => {
    if (isSuccess && data) {
      saveCookie(data).then(() => {
        router.push("/dashboard")
      })
    }
  }, [isSuccess, data])
  return (
    <Box className={styles.registernmain}>
      <Container component="main" maxWidth="xs">

        <Box
          className={styles.body}

        >
          <Typography component="h1" variant="h5" className={styles.heading}>
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  {...register("email")}
                  error={Boolean(errors.email)}
                  helperText={errors.email && errors.email.message}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("first_name")}
                  error={Boolean(errors.first_name)}
                  helperText={errors.first_name && errors.first_name.message}
                  id="first_name"
                  label="First Name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("last_name")}
                  error={Boolean(errors.last_name)}
                  helperText={errors.last_name && errors.last_name.message}
                  fullWidth
                  id="last_name"
                  label="First Name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("password")}
                  error={Boolean(errors.password)}
                  helperText={errors.password && errors.password.message}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel

                  control={<Checkbox value="allowExtraEmails" color="default" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={styles.button}
            >
              Sign Up
            </Button>

            <Box item className={styles.login_link}>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Box>

          </Box>
        </Box>

      </Container>
    </Box>
  )
}

export default Register