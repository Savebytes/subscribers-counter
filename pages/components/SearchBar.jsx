import React, {useState, useEffect} from 'react'

const SearchBar = (props) => {
    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 640;

    useEffect(() => {
        window.addEventListener("resize", () => setWidth(window.innerWidth));
    }, []);

    return 0;
}

export default SearchBar