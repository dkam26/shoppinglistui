import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import 'semantic-ui/dist/semantic.min.css';
ReactDOM.render(
   
    <BrowserRouter>
        <App />
    </BrowserRouter>
    
    ,document.getElementById('root')
);
registerServiceWorker();
