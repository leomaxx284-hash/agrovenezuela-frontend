import { useState } from 'react';
import { 
  Box, Typography, TextField, Button, Paper, Container, 
  Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Checkbox, MenuItem, Alert 
} from '@mui/material';
import { Link } from 'react-router-dom';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import axios from 'axios'; // Importamos nuestro cartero

const estadosVenezuela = [
  'Amazonas', 'Anzoátegui', 'Apure', 'Aragua', 'Barinas', 'Bolívar', 'Carabobo', 'Cojedes', 
  'Delta Amacuro', 'Distrito Capital', 'Falcón', 'Guárico', 'Lara', 'Mérida', 'Miranda', 
  'Monagas', 'Nueva Esparta', 'Portuguesa', 'Sucre', 'Táchira', 'Trujillo', 'La Guaira', 
  'Yaracuy', 'Zulia'
];

function Registro() {
  // Estado para mostrar mensajes de éxito o error en pantalla
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  // Esta función se ejecuta cuando el usuario le da clic a "Crear Cuenta"
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Recolectamos todos los datos del formulario automáticamente
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Validación rápida de contraseñas en el frontend
    if (data.password !== data.password_confirm) {
      setMensaje({ texto: 'Las contraseñas no coinciden', tipo: 'error' });
      return;
    }

    try {
      // 🚨 AQUÍ ESTÁ LA MAGIA: Enviamos los datos al Backend de tu compañero
      // NOTA: Esta URL debe coincidir con la que tu compañero programó
      const response = await axios.post('http://127.0.0.1:8000/api/registro/', data);
      
      console.log("Respuesta del servidor:", response.data);
      setMensaje({ texto: '¡Cuenta creada con éxito! Ya puedes iniciar sesión.', tipo: 'success' });
      
    } catch (error) {
      console.error("Error detallado:", error.response);
      setMensaje({ texto: 'Hubo un error al registrar. Revisa los datos o la conexión.', tipo: 'error' });
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', backgroundColor: '#f4f6f8', py: 2 }}>
      <Container maxWidth="sm"> 
        <Paper elevation={4} sx={{ p: { xs: 3, sm: 4 }, borderRadius: '16px', textAlign: 'center' }}>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1, color: '#2e7d32' }}>
            <AgricultureIcon sx={{ fontSize: 32, mr: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>AgroVenezuela</Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
            Crea tu cuenta y únete a la red agrícola
          </Typography>

          {/* Si hay un mensaje, lo mostramos aquí */}
          {mensaje.texto && (
            <Alert severity={mensaje.tipo} sx={{ mb: 2, textAlign: 'left' }}>
              {mensaje.texto}
            </Alert>
          )}

          {/* Agregamos el onSubmit aquí */}
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            
            <FormControl component="fieldset" sx={{ textAlign: 'left', bgcolor: '#e8f5e9', px: 2, py: 1, borderRadius: '8px' }}>
              <FormLabel component="legend" sx={{ fontWeight: 'bold', color: '#2e7d32', mb: 0, fontSize: '0.85rem' }}>
                ¿Qué tipo de cuenta deseas crear?
              </FormLabel>
              <RadioGroup row defaultValue="comprador" name="tipo_cuenta">
                <FormControlLabel value="comprador" control={<Radio size="small" color="success" />} label={<Typography variant="body2">Soy Comprador</Typography>} />
                <FormControlLabel value="distribuidor" control={<Radio size="small" color="success" />} label={<Typography variant="body2">Soy Distribuidor</Typography>} />
              </RadioGroup>
            </FormControl>

            {/* Agregamos la propiedad 'name' a todos los campos */}
            <TextField name="nombre_completo" label="Nombre Completo o Empresa" variant="outlined" size="small" fullWidth color="success" required />
            
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <TextField name="rif_cedula" label="RIF / Cédula" variant="outlined" size="small" fullWidth color="success" required />
              <TextField name="telefono" label="Teléfono" variant="outlined" size="small" fullWidth color="success" required />
            </Box>

            <TextField name="email" label="Correo Electrónico" variant="outlined" size="small" type="email" fullWidth color="success" required />
            
            <Typography variant="caption" sx={{ textAlign: 'left', color: '#2e7d32', fontWeight: 'bold', mb: -1 }}>
              Ubicación de la Empresa / Distribuidora
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <TextField name="estado" select label="Estado" variant="outlined" size="small" fullWidth color="success" defaultValue="" required>
                {estadosVenezuela.map((estado) => (
                  <MenuItem key={estado} value={estado} dense>
                    {estado}
                  </MenuItem>
                ))}
              </TextField>
              <TextField name="municipio" label="Municipio" variant="outlined" size="small" fullWidth color="success" required />
              <TextField name="sector" label="Sector" variant="outlined" size="small" fullWidth color="success" required />
            </Box>

            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <TextField name="password" label="Contraseña" variant="outlined" size="small" type="password" fullWidth color="success" required />
              <TextField name="password_confirm" label="Confirmar Contraseña" variant="outlined" size="small" type="password" fullWidth color="success" required />
            </Box>

            <FormControlLabel 
              control={<Checkbox size="small" color="success" required />} 
              label={<Typography variant="caption" color="text.secondary">Acepto los Términos y Condiciones</Typography>} 
              sx={{ textAlign: 'left', mt: -1 }}
            />
            
            {/* El botón ahora es de tipo 'submit' */}
            <Button type="submit" variant="contained" sx={{ mt: 1, bgcolor: '#2e7d32', borderRadius: '8px', fontWeight: 'bold', py: 1, '&:hover': { bgcolor: '#1b5e20' } }}>
              Crear Cuenta
            </Button>
          </Box>

          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" style={{ color: '#2e7d32', fontWeight: 'bold', textDecoration: 'none' }}>Inicia Sesión aquí</Link>
            </Typography>
          </Box>

        </Paper>
      </Container>
    </Box>
  );
}

export default Registro;