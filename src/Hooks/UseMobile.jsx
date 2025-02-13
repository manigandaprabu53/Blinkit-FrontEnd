import { useState, useEffect } from "react"

const UseMobile = (breakPoint = 768)=>{
    const [isMobile, setIsMobile] = useState(window.innerWidth < breakPoint);

    const handleResize = ()=>{
        const checkPoint = window.innerWidth < breakPoint;
        setIsMobile(checkPoint);
    }

    useEffect(()=>{
        handleResize();

        window.addEventListener('resize', handleResize)

        return ()=>{
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    return[isMobile]
}

export default UseMobile;