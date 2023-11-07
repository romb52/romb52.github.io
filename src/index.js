import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import App from './components/App/App.jsx';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(<App />);
