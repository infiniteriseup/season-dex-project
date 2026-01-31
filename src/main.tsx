import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

console.log('🚀 main.tsx loaded');

const rootElement = document.getElementById('root');
console.log('📦 Root element:', rootElement);

if (rootElement) {
  console.log('🎨 Creating React root...');
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  console.log('✅ React render called');
} else {
  console.error('❌ Root element not found!');
}
