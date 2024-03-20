import React, { useEffect, useRef } from "react";
import { useScroll} from 'framer-motion';

export default function Header() {
    const container = useRef();
    const paths = useRef([]);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'end end']
    });

    useEffect(() => {
        scrollYProgress.on("change", e => {
            paths.current.forEach((path, i) => {
                const offset = (5 + (i * 25) + (e * 25)) % 100; 
                path.setAttribute("startOffset", offset + "%");
            });
        });
    }, [scrollYProgress]);

    return (
        <div ref={container}>
            <svg className="w-full mb-40" viewBox="0 0 250 250"> 
                <path fill="none" id="circle" d="M125,0 A75,75 0 1,0 200,50 A75,75"/> 
                <text className="text-[6px] lowercase">
                    {
                        [...Array(7)].map((_, i) => {
                            return (
                                <textPath key={i} ref={ref => paths.current[i] = ref} startOffset={i * 90 + "%"} href="#circle" style={{ fill: '#51775B' }}>
                                    rose nguyen ✿ ux ui designer ✿
                                </textPath>
                            );
                        })
                    }
                </text>
            </svg>
        </div>
    );
}
