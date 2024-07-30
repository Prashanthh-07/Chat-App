
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Loading(){
    const navigate = useNavigate();

    useEffect(() => {
        
        const timer = setTimeout(() => {
            navigate('/');
        }, 1000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="loading-container">
            <svg viewBox="25 25 50 50">
                <circle r="20" cy="50" cx="50"></circle>
            </svg>
            <style jsx>{`
                .loading-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background-color: #131324;
                }

                svg {
                    width: 3.25em;
                    transform-origin: center;
                    animation: rotate4 2s linear infinite;
                }

                circle {
                    fill: none;
                    stroke: hsl(214, 97%, 59%);
                    stroke-width: 2;
                    stroke-dasharray: 1, 200;
                    stroke-dashoffset: 0;
                    stroke-linecap: round;
                    animation: dash4 1.5s ease-in-out infinite;
                }

                @keyframes rotate4 {
                    100% {
                        transform: rotate(360deg);
                    }
                }

                @keyframes dash4 {
                    0% {
                        stroke-dasharray: 1, 200;
                        stroke-dashoffset: 0;
                    }

                    50% {
                        stroke-dasharray: 90, 200;
                        stroke-dashoffset: -35px;
                    }

                    100% {
                        stroke-dashoffset: -125px;
                    }
                }
            `}</style>
        </div>
    );
};

export default Loading;
