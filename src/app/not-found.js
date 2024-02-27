"use client";
import React from 'react';
import { useEffect } from 'react';

let location = "";


export default function NotFound() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            location = window.location.href;
        }
    }, []);

    return (
        <main>
                <h1>404 - Page Not Found</h1>
                <p>
                        The page <code>{location}</code> could not be found.
                </p>
        </main>
    );
}