import { render } from 'preact';
import { Router } from 'wouter'; 
import App from './app'; // Import your main App component
import './index.css';

render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app')
);
