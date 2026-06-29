import { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Container, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import axios from 'axios';

function Login() {
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  const navigate = useNavigate(); // Herramienta para cambiar de página automáticamente

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // 🚨 EL TRUCO DEL ARQUITECTO:
      // Mapeamos "correo" hacia "username" porque así lo exige SimpleJWT por defecto
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username: data.correo,
        password: data.password
      });

      // ¡Exito! Guardamos los Tokens (Pases VIP) en la caja fuerte del navegador
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);

      setMensaje({ texto: '¡Inicio de sesión exitoso! Entrando al sistema...', tipo: 'success' });

      // Redirigimos al usuario a la página principal (o dashboard) después de 1.5 segundos
      setTimeout(() => {
        navigate('/'); // 💡 Aquí puedes cambiar '/' por la ruta de tu mapa o tienda
      }, 1500);

    } catch (error) {
      console.error("Error en login:", error.response);
      setMensaje({ texto: 'Credenciales incorrectas. Verifica tu correo y contraseña.', tipo: 'error' });
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', backgroundColor: '#f4f6f8', py: 2 }}>
      <Container maxWidth="xs">
        <Paper elevation={4} sx={{ p: { xs: 3, sm: 4 }, borderRadius: '16px', textAlign: 'center' }}>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1, color: '#2e7d32' }}>
            <AgricultureIcon sx={{ fontSize: 32, mr: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>AgroVenezuela</Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
            Inicia sesión en tu cuenta
          </Typography>

          {/* Alerta de mensajes */}
          {mensaje.texto && (
            <Alert severity={mensaje.tipo} sx={{ mb: 2, textAlign: 'left' }}>
              {mensaje.texto}
            </Alert>
          )}

          {/* Formulario */}
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField name="correo" label="Correo Electrónico" variant="outlined" size="small" type="email" fullWidth color="success" required />
            <TextField name="password" label="Contraseña" variant="outlined" size="small" type="password" fullWidth color="success" required />

            <Button type="submit" variant="contained" sx={{ mt: 2, bgcolor: '#2e7d32', borderRadius: '8px', fontWeight: 'bold', py: 1, '&:hover': { bgcolor: '#1b5e20' } }}>
              Entrar
            </Button>
          </Box>

          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              ¿No tienes una cuenta?{' '}
              <Link to="/registro" style={{ color: '#2e7d32', fontWeight: 'bold', textDecoration: 'none' }}>Regístrate aquí</Link>
            </Typography>
          </Box>

        </Paper>
      </Container>
    </Box>
  );
}

export default Login;