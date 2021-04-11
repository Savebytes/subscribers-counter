import {createGlobalStyle} from 'styled-components';

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        text-decoration: none;
        box-sizing: border-box;
    }

    html, body, #root {
        height: 100%;
    }

    body {
        margin: 0 auto;
	    background-color: #36393E;
	    color: white;
    }

    *, button, input {
        border: 0;
        font-family: 'Roboto', sans-serif;
    }
`;