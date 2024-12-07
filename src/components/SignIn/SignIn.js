
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import "./SignIn.css";
import { useNavigate } from 'react-router-dom';
import BasicAlerts from './BasicAlerts';
import { useEffect, useState } from 'react';
import { image } from "../../assests/office.avif";

const defaultTheme = createTheme(
    {
        palette: {
            background: {
                default: "rgb(244, 244, 244)",  
            },
        },
    }
);

export default function SignIn() {
    const [showAlert, setShowAlert] = useState(false);

    const navigate = useNavigate();

    const users = [
        {
            id: 1,
            email: "Recruiter@gmail.com",
            password: "123",
            role: "recruiter"
        },
        {
            id: 2,
            email: "Interviewer@gmail.com",
            password: "1234",
            role: "interviewer"
        }
    ];

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: true 
        },
        validate: values => {
            let errors = {};
            if (!values.email) {
                errors.email = "Please enter an email";
            } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)) {
                errors.email = "Please enter a valid email";
            }
            if (!values.password) {
                errors.password = "Please enter a password";
            } else if (values.password.length < 3) {
                errors.password = "Password must contain at least 3 Characters";
            }
            return errors;
        },
        onSubmit: values => {
            const user = users.find(user => user.email === values.email && user.password === values.password);
            if (user) {
                if (values.rememberMe) {
                    localStorage.setItem("email", values.email);
                    localStorage.setItem("password", values.password);
                }
                setShowAlert(false);
                if (user.role === "recruiter") {
                    navigate("/portal/jobDesc");
                } else if (user.role === "interviewer") {
                    navigate("/portal/interviewer");
                }
            } else {
                setShowAlert(true);
            }
        }
    });


    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        const storedPassword = localStorage.getItem("password");

        if (storedEmail && storedPassword) {
            formik.setValues({
                email: storedEmail,
                password: storedPassword,
                rememberMe: true 
            });
        }
    }, []); 

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs" className='anbu'>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5" sx={{ marginTop: "10px", fontSize: "30px" }}>
                        Recrutify
                    </Typography>
                    <p className='text-dark'>Please enter your Credentials to Login</p>
                    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            className='mt-1'
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            margin="normal"
                            className='mt-1'
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="rememberMe"
                                    color="primary"
                                    checked={formik.values.rememberMe}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            }
                            label="Remember me"
                        />
                        {
                            showAlert && <BasicAlerts />
                        }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 5 }}
                            disabled={!formik.isValid}
                        >
                            LOGIN
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
