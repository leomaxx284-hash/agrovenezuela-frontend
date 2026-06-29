import { useState, useEffect } from 'react';
import { MapContainer, GeoJSON, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import datosDistribuidoras from '../distribuidoras.json';
import geojsonVenezuela from '../venezuela.json'; 

import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import { 
  AppBar, Toolbar, Typography, Button, Box, IconButton, 
  InputBase, Paper, Badge, Drawer, List, ListItem, ListItemText, Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close'; // Icono para cerrar el carrito
import { Link } from 'react-router-dom';

// Configuración de iconos por defecto de Leaflet
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function Mapa() {
  const posicionCentral = [7.5, -66.0];
  
  const [busqueda, setBusqueda] = useState('');
  const [carrito, setCarrito] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [estadoHover, setEstadoHover] = useState(null);

  // Efecto para verificar si el usuario inició sesión
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
    window.location.reload(); 
  };

  const estiloEstado = { fillColor: '#e8f5e9', weight: 2, opacity: 1, color: '#2e7d32', fillOpacity: 0.7 };

  const interaccionEstado = (feature, layer) => {
    layer.on({
      mouseover: (e) => {
        const nombreEstado = feature.properties.NAME_1 || feature.properties.name || feature.properties.estado;
        setEstadoHover(nombreEstado);
        e.target.setStyle({ fillOpacity: 0.9, fillColor: '#81c784' }); 
      },
      mouseout: (e) => {
        setEstadoHover(null);
        e.target.setStyle(estiloEstado);
      }
    });
  };

  return (
    <Box sx={{ maxWidth: '1200px', margin: '0 auto', p: 2 }}>
      
      {/* BARRA SUPERIOR (Tu diseño original intacto) */}
      <AppBar position="static" elevation={3} sx={{ backgroundColor: '#2e7d32', borderRadius: '12px', mb: 3 }}>
        <Toolbar sx={{ justifyContent: 'space-between', padding: '10px' }}>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AgricultureIcon sx={{ fontSize: 35, color: '#ffffff' }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
              AgroVenezuela
            </Typography>
          </Box>

          <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, borderRadius: '30px' }}>
            <IconButton sx={{ p: '10px' }}>
              <SearchIcon />
            </IconButton>
            <InputBase 
              sx={{ ml: 1, flex: 1 }} 
              placeholder="Buscar hortalizas..." 
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </Paper>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <IconButton color="inherit" onClick={() => setCarritoAbierto(true)}>
              <Badge badgeContent={carrito.length} color="error">
                <ShoppingCartIcon fontSize="large" />
              </Badge>
            </IconButton>

            {isAuthenticated ? (
              <>
                {/* CORRECCIÓN AQUÍ: Ahora viaja correctamente a /dashboard */}
                <Button component={Link} to="/dashboard" sx={{ color: '#fff', fontWeight: 'bold' }}>Mi Panel</Button>
                <Button onClick={handleLogout} variant="outlined" sx={{ color: '#fff', borderColor: '#fff', borderRadius: '20px', fontWeight: 'bold' }}>
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Button component={Link} to="/registro" variant="outlined" sx={{ color: '#fff', borderColor: '#fff', borderRadius: '20px', fontWeight: 'bold' }}>
                  Registrarse
                </Button>
                <Button component={Link} to="/login" variant="contained" sx={{ bgcolor: '#fff', color: '#2e7d32', borderRadius: '20px', fontWeight: 'bold', '&:hover': { bgcolor: '#f5f5f5' } }}>
                  Entrar
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* MAPA */}
      <Box sx={{ height: '600px', width: '100%', mt: 2 }}>
        <MapContainer center={posicionCentral} zoom={6} style={{ height: '100%', width: '100%' }}>
           <GeoJSON 
             data={geojsonVenezuela} 
             style={estiloEstado} 
             onEachFeature={interaccionEstado} 
           />
           {datosDistribuidoras.map((d) => {
             if (!d.posicion) return null;
             if (estadoHover && d.estado === estadoHover) {
               return <Marker key={d.id} position={d.posicion} />;
             }
             return null;
           })}
        </MapContainer>
      </Box>

      {/* MENÚ LATERAL DEL CARRITO (Añadido para que el botón responda) */}
      <Drawer anchor="right" open={carritoAbierto} onClose={() => setCarritoAbierto(false)}>
        <Box sx={{ width: 350, p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Mi Carrito 🛒</Typography>
            <IconButton onClick={() => setCarritoAbierto(false)}><CloseIcon /></IconButton>
          </Box>
          <Divider />
          <List>
            {carrito.length === 0 ? (
              <Typography sx={{ mt: 3, color: 'text.secondary', textAlign: 'center' }}>
                El carrito está vacío. ¡Elige productos en el mapa!
              </Typography>
            ) : (
              carrito.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText primary={item.nombre} secondary={`Cantidad: ${item.cantidad}`} />
                </ListItem>
              ))
            )}
          </List>
        </Box>
      </Drawer>

    </Box>
  );
}

export default Mapa;