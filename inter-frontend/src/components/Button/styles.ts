import styled from "styled-components";

export const ButtonContainer = styled.button `
    width: 100%;
    height: 46px;

    background: var(--PRIMARY);
    color: var(--BACKGROUND);
    border: 1px solid var(--PRIMARY);
    border-radius:10px;
    
    margin-bottom: 20px;

    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5000;

    &:hover {
        filter: opacity(0.8)
    }

    &:disabled {
        filter: opacity(0.4)
    }

`