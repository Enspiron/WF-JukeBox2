
"use client";
import React from 'react';

const PwaModal = ({show, onClose, onInstall}) => {
    return (
        <div style={{position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50}}>
            <div style={{backgroundColor: 'white', width: '94%', padding: '4px', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'}}>
                <h2 style={{fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem'}}>Install the app</h2>
                <p style={{fontSize: '0.875rem', marginBottom: '1rem', color: 'black'}}>
                    Click the button below to install the app
                </p>
                <div>
                    <button onClick={onInstall} style={{backgroundColor: '#4299E1', color: 'white', padding: '8px 16px', borderRadius: '4px'}}>Install PWA</button>
                </div>
                <div>
                    <button onClick={onClose} style={{backgroundColor: '#718096', color: 'white', padding: '8px 16px', borderRadius: '4px', marginTop: '1rem'}}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default PwaModal;