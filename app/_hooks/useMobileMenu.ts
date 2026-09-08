"use client"

import { useState, useEffect, useCallback } from 'react';

export const useMobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Montar componente no cliente
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Fechar menu ao redimensionar para desktop
    useEffect(() => {
        if (!isMounted) return;

        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMounted]);

    // Evitar scroll quando menu está aberto
    useEffect(() => {
        if (!isMounted) return;

        if (isOpen) {
            // Prevenir scroll
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none';
            document.documentElement.style.overflow = 'hidden';
        } else {
            // Restaurar scroll
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
            document.documentElement.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
            document.documentElement.style.overflow = '';
        };
    }, [isOpen, isMounted]);

    const toggle = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
    }, []);

    const open = useCallback(() => {
        setIsOpen(true);
    }, []);

    return { isOpen, toggle, close, open };
};