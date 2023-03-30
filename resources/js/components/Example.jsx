import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chat from './Chat';
import Home from './Home';
import Pagenotfound from './Pagenotfound';

function Example() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/chat/' element={<Chat />} />
                <Route path='/chat/:id' element={<Chat />} />
                <Route path='*' element={<Pagenotfound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Example;

if (document.getElementById('example')) {
    const Index = ReactDOM.createRoot(document.getElementById("example"));

    Index.render(
        <React.StrictMode>
            <Example />
        </React.StrictMode>
    )
}
