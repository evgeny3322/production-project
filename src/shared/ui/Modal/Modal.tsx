import { classNames } from 'shared/lib/classNames/classNames';
import React, {
    ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState,
} from 'react';
import { Portal } from 'shared/ui/Portal/Portal';
import { useTheme } from 'app/providers/ThemeProvider';
import s from './Modal.module.scss';

interface ModalProps {
    className?: string
    children?: ReactNode
    isOpen?: boolean
    onClose?: () => void
    lazy?: boolean
}

const ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
    const {
        className,
        children,
        onClose,
        isOpen,
        lazy,
    } = props;

    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [isOpening, setIsOpening] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    const { theme } = useTheme();

    const mods: Record<string, boolean> = {
        [s.isClosing]: isClosing,
        [s.opened]: isOpening,
    };

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
        // Убираем модалку из дома
        return () => {
            setIsMounted(false);
        };
    }, [isOpen]);

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeHandler();
        }
    }, [closeHandler]);

    useEffect(() => {
        if (isOpen) {
            timerRef.current = setTimeout(() => {
                setIsOpening(true);
            }, 0);
            window.addEventListener('keydown', onKeyDown);
        }
        return () => {
            setIsOpening(false);
            clearTimeout(timerRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(s.Modal, mods, [className, theme, 'app_modal'])}>
                <div
                    className={s.overlay}
                    onClick={closeHandler}
                >
                    <div
                        className={s.content}
                        onClick={onContentClick}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
