import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, CircularProgress, Typography } from '@mui/material';

// Importamos los dos paneles
import DashboardComprador from './DashboardComprador';
import DashboardDistribuidor from './DashboardDistribuidor';

function Dashboard() {
  const [tipoCuenta, setTipoCuenta] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const consultarPerfil = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const respuesta = await axios.get('http://127.0.0.1:8000/api/perfil/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setTipoCuenta(respuesta.data.tipo_cuenta);
      } catch (error) {
        console.error("Error al consultar el perfil:", error);
      } finally {
        setCargando(false);
      }
    };

    consultarPerfil();
  }, []);

  if (cargando) {
    return (
      <Box sx={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 2 }}>
        <CircularProgress color="success" />
        <Typography variant="h6" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
          Cargando tu panel...
        </Typography>
      </Box>
    );
  }

  // --- LA CORRECCIÓN: Convertimos la respuesta a minúsculas ---
  const cuentaNormalizada = tipoCuenta ? tipoCuenta.toLowerCase() : '';

  // Evaluamos la cuenta en minúsculas
  if (cuentaNormalizada === 'soy distribuidor' || cuentaNormalizada === 'distribuidor') {
    return <DashboardDistribuidor />;
  }

  if (cuentaNormalizada === 'soy comprador' || cuentaNormalizada === 'comprador') {
    return <DashboardComprador />;
  }

  // Si pasa algo raro, mostramos un error
  return (
    <Typography align="center" sx={{ mt: 5, color: 'red' }}>
      Error: Tipo de cuenta no reconocido ({tipoCuenta}).
    </Typography>
  );
}

export default Dashboard;