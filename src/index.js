import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import 'antd/dist/antd.css';
import 'antd/dist/antd.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    body2: {
      fontSize: '16px',
    },
  },
});




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

