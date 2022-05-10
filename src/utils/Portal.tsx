import React from 'react';
import ReactDOM from "react-dom";

interface IPortal {
    children: React.ReactNode;
}

const Portal: React.FC<IPortal> = ({ children }) => {

    const el = document.getElementById('portal') as HTMLElement;

    // useEffect(() => {
    //   // Use this in case CRA throws an error about react-hooks/exhaustive-deps
    //   const current = el.current;

    //   // We assume `modalRoot` exists with '!'
    //   modalRoot!.appendChild(current);
    //   return () => void modalRoot!.removeChild(current);
    // }, []);

    return ReactDOM.createPortal(children, el);
};

export default Portal;