import { useState, useEffect } from "react";

const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState({ x: null, y: null });

    const updateMousePosition = e => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    };

    useEffect(() => {
        const throttle = (callback, delay) => {
            let previousCall = new Date().getTime();
            return function () {
                const time = new Date().getTime();
                if ((time - previousCall) >= delay) {
                    previousCall = time;
                    callback.apply(null, arguments);
                }
            };
        };

        const throttledUpdateMousePosition = throttle(updateMousePosition, 20);

        window.addEventListener("mousemove", throttledUpdateMousePosition);

        return () => window.removeEventListener("mousemove", throttledUpdateMousePosition);
    }, []);

    return mousePosition;
};

export default useMousePosition;
