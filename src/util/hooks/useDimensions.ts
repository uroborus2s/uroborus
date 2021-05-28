import { useLayoutEffect, useRef } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

// const useDimensions = (callback) => {
//     const obRef = useRef()
//
//     useLayoutEffect(() => {
//         // const {ResizeObserver} = window as typeof window & { ResizeObserver: ResizeObserver };
//         if (!ResizeObserver) return;
//         const resizeObserver = new ResizeObserver(() => {
//             if (obRef.current) {
//                 callback(obRef.current)
//             }
//         });
//
//         resizeObserver.observe(obRef.current!);
//
//         return () => {
//             resizeObserver.disconnect();
//         };
//     }, []);
//
//     return obRef
// }
