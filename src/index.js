import { createRoot } from 'react-dom/client';
import './styles.css';
import Main from './components/Main/Main';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(<Main />);
