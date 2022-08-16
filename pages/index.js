import React from 'react'
import styles from '../styles/Login.module.css'
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
import BgImage from '../public/asset/images/bg-img.jpg';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from 'react-redux';

const theme = createTheme();

const Login = () => {
    console.log("🚀 ~ file: login.js ~ line 26 ~ Login ~ state", state)
    const SignupSchema = yup.object().shape({
        email: yup.string()
            .required("Email is required")
            .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Email is not valid"),
        password: yup.string().required("Password is required"),
    });
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(SignupSchema)
    });
    console.log("🚀 ~ file: login.js ~ line 40 ~ Login ~ errors", errors)
    const onSubmit = data => console.log(data);


    return (
        <Box className={styles.loginmain}>
            <Container component="main" maxWidth="xs">
                <Box
                    className={styles.body}

                >

                    <Typography component="h1" variant="h5" className={styles.heading}>
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                        <TextField
                            {...register("email")}
                            margin="normal"
                            error={Boolean(errors.email)}
                            helperText={errors.email && errors.email.message}
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus

                        />
                        <TextField
                            {...register("password")}
                            margin="normal"
                            error={Boolean(errors.password)}
                            helperText={errors.password && errors.password.message}
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"

                        />
                        <Grid container className={styles.grid}>
                            <FormControlLabel

                                control={<Checkbox value={true} color="default" />}
                                label="Remember me"
                            />
                            <Grid item xs>
                                <Link href="#" variant="body2" className={styles.passdiv}>
                                    Forgot password?
                                </Link>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"

                            className={styles.button}
                        >
                            Sign In
                        </Button>


                        <Box className={styles.signup_link}>
                            <Link href="#" variant="body2" >
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Box>

                    </Box>
                </Box>

            </Container>
        </Box>
    )
}

export default Login