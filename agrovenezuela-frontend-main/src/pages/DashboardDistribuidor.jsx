import { useState } from 'react';
import { 
  Box, Typography, Grid, Paper, Button, Table, 
  TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField // <-- NUEVOS IMPORTS
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

function DashboardDistribuidor() {
  // Ahora usamos setProductos para poder modificar la tabla
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Tomate Perita', precio: 2.5, stock: 150, estado: 'Disponible' },
    { id: 2, nombre: 'Cebolla Blanca', precio: 1.8, stock: 30, estado: 'Poco Stock' },
    { id: 3, nombre: 'Pimentón Verde', precio: 3.0, stock: 0, estado: 'Agotado' },
  ]);

  const [pedidos] = useState([
    { id: '#1024', cliente: 'Carlos Mendoza', total: 45.0, estado: 'Pendiente' },
    { id: '#1025', cliente: 'María Pérez', total: 12.5, estado: 'Enviado' },
  ]);

  // --- LÓGICA DE LA VENTANA EMERGENTE ---
  const [modalAbierto, setModalAbierto] = useState(false);
  const [formulario, setFormulario] = useState({ nombre: '', precio: '', stock: '' });

  const abrirModal = () => setModalAbierto(true);
  
  const cerrarModal = () => {
    setModalAbierto(false);
    // Limpiamos los campos al cerrar
    setFormulario({ nombre: '', precio: '', stock: '' });
  };

  const manejarCambio = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const guardarProducto = (e) => {
    e.preventDefault();
    
    // Calculamos automáticamente la etiqueta de estado según los kilos
    const cantidadStock = parseInt(formulario.stock);
    let estadoAsignado = 'Disponible';
    
    if (cantidadStock <= 0) estadoAsignado = 'Agotado';
    else if (cantidadStock <= 50) estadoAsignado = 'Poco Stock';

    const nuevoProducto = {
      id: productos.length + 1, // Simulamos un nuevo ID
      nombre: formulario.nombre,
      precio: parseFloat(formulario.precio),
      stock: cantidadStock,
      estado: estadoAsignado
    };

    // Actualizamos la tabla agregando el nuevo producto
    setProductos([...productos, nuevoProducto]);
    cerrarModal(); // Y cerramos la ventana
  };

  return (
    <Box sx={{ maxWidth: '1200px', margin: '0 auto', p: 3 }}>
      
      {/* ENCABEZADO */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
          Mi Panel de Distribuidor
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={abrirModal} // <-- CONECTAMOS EL BOTÓN
          sx={{ bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1b5e20' } }}
        >
          Nuevo Producto
        </Button>
      </Box>

      {/* TARJETAS DE RESUMEN */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={2} sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, borderRadius: '12px' }}>
            <InventoryIcon sx={{ fontSize: 40, color: '#2e7d32' }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Mis Productos</Typography>
              <Typography variant="h4" sx={{ color: 'text.secondary' }}>{productos.length}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={2} sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, borderRadius: '12px' }}>
            <LocalShippingIcon sx={{ fontSize: 40, color: '#f57c00' }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Pedidos Pendientes</Typography>
              <Typography variant="h4" sx={{ color: 'text.secondary' }}>1</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* INVENTARIO (TABLA) */}
      <Paper elevation={2} sx={{ borderRadius: '12px', overflow: 'hidden', mb: 4 }}>
        <Box sx={{ p: 2, bgcolor: '#f4f6f8', borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Inventario Actual</Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Producto</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Precio ($)</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Stock (Kg)</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productos.map((prod) => (
                <TableRow key={prod.id} hover>
                  <TableCell>{prod.nombre}</TableCell>
                  <TableCell>${prod.precio.toFixed(2)}</TableCell>
                  <TableCell>{prod.stock}</TableCell>
                  <TableCell>
                    <Chip 
                      label={prod.estado} 
                      size="small"
                      color={
                        prod.estado === 'Disponible' ? 'success' : 
                        prod.estado === 'Poco Stock' ? 'warning' : 'error'
                      } 
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton color="primary"><EditIcon /></IconButton>
                    <IconButton color="error"><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* --- VENTANA EMERGENTE (MODAL) --- */}
      <Dialog open={modalAbierto} onClose={cerrarModal} maxWidth="sm" fullWidth>
        <form onSubmit={guardarProducto}>
          <DialogTitle sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Agregar Nuevo Producto</DialogTitle>
          <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField 
              label="Nombre de la Hortaliza" 
              name="nombre" 
              value={formulario.nombre} 
              onChange={manejarCambio} 
              required 
              fullWidth 
              color="success"
            />
            <TextField 
              label="Precio por Kg ($)" 
              name="precio" 
              type="number" 
              inputProps={{ step: "0.01", min: "0" }}
              value={formulario.precio} 
              onChange={manejarCambio} 
              required 
              fullWidth 
              color="success"
            />
            <TextField 
              label="Stock Disponible (Kg)" 
              name="stock" 
              type="number" 
              inputProps={{ min: "0" }}
              value={formulario.stock} 
              onChange={manejarCambio} 
              required 
              fullWidth 
              color="success"
            />
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={cerrarModal} color="error">Cancelar</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1b5e20' } }}>
              Guardar Producto
            </Button>
          </DialogActions>
        </form>
      </Dialog>

    </Box>
  );
}

export default DashboardDistribuidor;