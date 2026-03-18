import {
    Box,
    Button,
    Divider,
    IconButton,
    InputAdornment,
    TextField,
    Paper,
    Typography,
    Stack,
    alpha,
    useTheme,
    CircularProgress
} from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Security/authContext";
import AOS from "aos";
import "aos/dist/aos.css";

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessIcon from '@mui/icons-material/Business';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function LoginComponent() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { login } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    async function onSubmit(values) {
        setIsSubmitting(true);
        if (await login(values.username, values.password)) {
            navigate(`/`);
        } else {
            setIsSubmitting(false);
        }
    }

    function validate(values) {
        let errors = {};
        if (!values.username) {
            errors.username = "Username is required";
        }
        if (!values.password) {
            errors.password = "Password is required";
        }
        return errors;
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.info.main} 100%)`,
                position: 'relative',
                overflow: 'hidden',
                p: 2
            }}
        >
            {/* Animated Background Decor */}
            <Box
                sx={{
                    position: 'absolute',
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%',
                    background: alpha(theme.palette.primary.light, 0.1),
                    top: '-200px',
                    left: '-200px',
                    filter: 'blur(100px)',
                    zIndex: 0
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    width: '400px',
                    height: '400px',
                    borderRadius: '50%',
                    background: alpha(theme.palette.info.light, 0.1),
                    bottom: '-100px',
                    right: '-100px',
                    filter: 'blur(80px)',
                    zIndex: 0
                }}
            />

            <Paper
                data-aos="zoom-in"
                elevation={24}
                sx={{
                    width: '100%',
                    maxWidth: 450,
                    borderRadius: 6,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    background: alpha('#fff', 0.8),
                    backdropFilter: 'blur(20px)',
                    border: '1px solid',
                    borderColor: alpha('#fff', 0.5),
                    zIndex: 1,
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
                }}
            >
                {/* Header Section */}
                <Box
                    sx={{
                        p: 4,
                        textAlign: 'center',
                        background: alpha(theme.palette.primary.main, 0.05),
                        borderBottom: '1px solid',
                        borderColor: alpha(theme.palette.divider, 0.1)
                    }}
                >
                    <Box
                        sx={{
                            width: 64,
                            height: 64,
                            borderRadius: '16px',
                            bgcolor: theme.palette.primary.main,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 2,
                            boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.3)}`
                        }}
                    >
                        <BusinessIcon sx={{ fontSize: 32, color: 'white' }} />
                    </Box>
                    <Typography variant="h4" fontWeight="900" sx={{ letterSpacing: '-0.5px', color: theme.palette.text.primary }}>
                        AssetFlow
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontWeight: 500 }}>
                        Enterprise Asset Management Portal
                    </Typography>
                </Box>

                {/* Form Section */}
                <Box sx={{ p: 4 }}>
                    <Formik
                        initialValues={{ username: '', password: '' }}
                        onSubmit={onSubmit}
                        validate={validate}
                    >
                        {(props) => (
                            <Form>
                                <Stack spacing={3}>
                                    <Box data-aos="fade-up" data-aos-delay="100">
                                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', ml: 0.5 }}>
                                            Username
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            name="username"
                                            id="username"
                                            placeholder="Enter your employee ID"
                                            value={props.values.username}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            error={props.touched.username && Boolean(props.errors.username)}
                                            helperText={props.touched.username && props.errors.username}
                                            variant="outlined"
                                            slotProps={{
                                                input: {
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <AccountCircleIcon sx={{ color: theme.palette.primary.main }} />
                                                        </InputAdornment>
                                                    ),
                                                    sx: { borderRadius: 3, bgcolor: alpha('#fff', 0.5) }
                                                }
                                            }}
                                        />
                                    </Box>

                                    <Box data-aos="fade-up" data-aos-delay="200">
                                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', ml: 0.5 }}>
                                            Password
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            name="password"
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={props.values.password}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            error={props.touched.password && Boolean(props.errors.password)}
                                            helperText={props.touched.password && props.errors.password}
                                            variant="outlined"
                                            slotProps={{
                                                input: {
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <LockIcon sx={{ color: theme.palette.primary.main }} />
                                                        </InputAdornment>
                                                    ),
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                onClick={() => setShowPassword(!showPassword)}
                                                                edge="end"
                                                                size="small"
                                                            >
                                                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                    sx: { borderRadius: 3, bgcolor: alpha('#fff', 0.5) }
                                                }
                                            }}
                                        />
                                    </Box>

                                    <Button
                                        fullWidth
                                        variant="contained"
                                        size="large"
                                        type="submit"
                                        disabled={isSubmitting}
                                        data-aos="fade-up"
                                        data-aos-delay="300"
                                        endIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <ArrowForwardIcon />}
                                        sx={{
                                            mt: 2,
                                            py: 1.8,
                                            borderRadius: 3,
                                            fontWeight: 'bold',
                                            textTransform: 'none',
                                            fontSize: '1rem',
                                            boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                                            transition: '0.3s',
                                            '&:hover': {
                                                transform: 'translateY(-2px)',
                                                boxShadow: `0 12px 25px ${alpha(theme.palette.primary.main, 0.4)}`,
                                            }
                                        }}
                                    >
                                        {isSubmitting ? "Authenticating..." : "Sign In to Portal"}
                                    </Button>

                                    <Divider data-aos="fade-up" data-aos-delay="400">
                                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                                            HELP & SUPPORT
                                        </Typography>
                                    </Divider>

                                    <Box
                                        data-aos="fade-up"
                                        data-aos-delay="500"
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            gap: 2
                                        }}
                                    >
                                        <Typography variant="caption" sx={{ color: 'text.secondary', cursor: 'pointer', '&:hover': { color: theme.palette.primary.main } }}>
                                            Forgot Password?
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: theme.palette.divider }}>|</Typography>
                                        <Typography variant="caption" sx={{ color: 'text.secondary', cursor: 'pointer', '&:hover': { color: theme.palette.primary.main } }}>
                                            Contact Admin
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Paper>
        </Box>
    );
}