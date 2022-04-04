import React from 'react';
import useDarkMode from 'use-dark-mode'

const DarkModeToggle = () => {
    const darkMode = useDarkMode(true);

    return (
        <div>
            <button onClick={darkMode.toggle}>
            {darkMode.value ? '☀' : '☾'}
            </button>
        </div>
    )
}

export default DarkModeToggle
