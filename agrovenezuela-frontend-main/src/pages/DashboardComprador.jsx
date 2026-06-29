import { useState } from 'react';
import { 
  Box, Typography, Grid, Paper, Table, 
  TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Button 
} from '@mui/material';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Link } from 'react-router-dom';

function DashboardComprador() {
  // DATOS SIMULADOS: Pedidos que el comprador está esperando
  const [pedidosActivos] = useState([
    { id: '#2049', distribuidora: 'Distribuidora Los Andes', fecha: '28/06/2026', total: 34.50, estado: 'En Camino' },
    { id: '#2050', distribuidora: 'Agro Campo Sur', fecha: '29/06/2026', total: 12.00, estado: 'Preparando' },
  ]);

  // DATOS SIMULADOS: Pedidos que ya fueron entregados en el pasado
  const [historial] = useState([
    { id: '#1980', distribuidora: 'Finca El Sol', fecha: '15/05/2026', total: 55.00, estado: 'Entregado' },
    { id: '#1901', distribuidora: 'Distribuidora Los Andes', fecha: '02/04/2026', total: 28.30, estado: 'Entregado' },
  ]);

  // Función para darle color a la etiqueta según el estado del pedido
  const colorEstado = (estado) => {
    switch(estado) {
      case 'En Camino': return 'info'; // Azul
      case 'Preparando': return 'warning'; // Naranja
      case 'Entregado': return 'success'; // Verde
      default: return 'default';
    }
  };

  return (
    <Box sx={{ maxWidth: '1200px', margin: '0 auto', p: 3 }}>
      
      {/* ENCABEZADO */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
          Mi Panel de Compras
        </Typography>
        <Button 
          component={Link} 
          to="/" 
          variant="outlined" 
          startIcon={<StorefrontIcon />} 
          sx={{ color: '#2e7d32', borderColor: '#2e7d32', fontWeight: 'bold' }}
        >
          Ir al Mapa a Comprar
        </Button>
      </Box>

      {/* TARJETAS DE RESUMEN */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={2} sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, borderRadius: '12px' }}>
            <LocalMallIcon sx={{ fontSize: 40, color: '#f57c00' }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Pedidos en Curso</Typography>
              <Typography variant="h4" sx={{ color: 'text.secondary' }}>{pedidosActivos.length}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={2} sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, borderRadius: '12px' }}>
            <CheckCircleIcon sx={{ fontSize: 40, color: '#2e7d32' }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Compras Exitosas</Typography>
              <Typography variant="h4" sx={{ color: 'text.secondary' }}>{historial.length}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* SECCIÓN: PEDIDOS ACTIVOS */}
      <Paper elevation={2} sx={{ borderRadius: '12px', overflow: 'hidden', mb: 4, borderLeft: '5px solid #f57c00' }}>
        <Box sx={{ p: 2, bgcolor: '#f4f6f8', borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocalMallIcon sx={{ color: '#f57c00' }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Seguimiento de Pedidos</Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>N° Pedido</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Distribuidora</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Fecha de Compra</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Total Pagado</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pedidosActivos.map((pedido) => (
                <TableRow key={pedido.id} hover>
                  <TableCell sx={{ fontWeight: 'bold', color: '#555' }}>{pedido.id}</TableCell>
                  <TableCell>{pedido.distribuidora}</TableCell>
                  <TableCell>{pedido.fecha}</TableCell>
                  <TableCell>${pedido.total.toFixed(2)}</TableCell>
                  <TableCell align="right">
                    <Chip label={pedido.estado} color={colorEstado(pedido.estado)} size="small" sx={{ fontWeight: 'bold' }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* SECCIÓN: HISTORIAL DE COMPRAS */}
      <Paper elevation={2} sx={{ borderRadius: '12px', overflow: 'hidden', borderLeft: '5px solid #2e7d32' }}>
        <Box sx={{ p: 2, bgcolor: '#f4f6f8', borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', gap: 1 }}>
          <ReceiptLongIcon sx={{ color: '#2e7d32' }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Historial de Compras</Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>N° Pedido</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Distribuidora</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Fecha de Compra</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Total Pagado</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {historial.map((pedido) => (
                <TableRow key={pedido.id} hover>
                  <TableCell sx={{ fontWeight: 'bold', color: '#555' }}>{pedido.id}</TableCell>
                  <TableCell>{pedido.distribuidora}</TableCell>
                  <TableCell>{pedido.fecha}</TableCell>
                  <TableCell>${pedido.total.toFixed(2)}</TableCell>
                  <TableCell align="right">
                    <Chip label={pedido.estado} color={colorEstado(pedido.estado)} size="small" sx={{ fontWeight: 'bold' }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

    </Box>
  );
}

export default DashboardComprador;