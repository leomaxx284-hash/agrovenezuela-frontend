import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, InputBase } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled, alpha } from '@mui/material/styles';

// Estilo profesional para el buscador
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: { marginLeft: theme.spacing(3), width: 'auto' },
}));

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificamos si existe el token en cada renderizado
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
    window.location.href = '/login'; 
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#2e7d32' }}>
      <Toolbar>
        {/* 1. Logo */}
        <AgricultureIcon sx={{ mr: 1 }} />
        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold', mr: 2 }}>
          AgroVenezuela
        </Typography>

        {/* 2. Buscador (Visible siempre) */}
        <Search>
          <Box sx={{ p: 1, height: '100%', position: 'absolute', display: 'flex', alignItems: 'center' }}>
            <SearchIcon />
          </Box>
          <InputBase placeholder="Buscar productos..." sx={{ color: 'inherit', pl: 4, py: 0.5 }} />
        </Search>

        <Box sx={{ flexGrow: 1 }} />

        {/* 3. Carrito (Visible siempre) */}
        <IconButton color="inherit" component={Link} to="/carrito">
          <ShoppingCartIcon />
        </IconButton>

        {/* 4. Lógica de Sesión (Solo cambia esto) */}
        <Box>
          {isAuthenticated ? (
            <>
              <Button color="inherit" onClick={handleLogout}>Cerrar Sesión</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Entrar</Button>
              <Button component={Link} to="/registro" sx={{ bgcolor: 'white', color: '#2e7d32', ml: 1, '&:hover': { bgcolor: '#e8f5e9' } }}>
                Registrarse
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;