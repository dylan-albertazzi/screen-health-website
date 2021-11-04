import Tooltip from "../Tooltip";
import styled from "styled-components";
import { breakpoints } from "../../utils/breakpoints";

export default function TooltipLink({ href, children }) {
    return (
        <Tooltip content={<StyledUrl href={href}>{href}</StyledUrl>}>
            <StyledContainer>
                <StyledLink href={href}>
                    <span>{children}</span>
                </StyledLink>
            </StyledContainer>
        </Tooltip>
    );
}

const StyledUrl = styled.a`
    color: var(--color-gray-600);
    transition: color 0.2s ease-in-out;
    text-align: center;
    &:hover {
        color: var(--color-bright-crimson);
    }
`;

const StyledContainer = styled.div`
    display: inline-block;
    align-items: center;
    justify-content: center;
    position: relative;
    left: 0px;
    top: 0px;
`;
const StyledLink = styled.a`
    cursor: pointer;
    position: relative;
    white-space: nowrap;
    outline: none;
    word-break: break-all;
    &::before {
        @media (min-width: 550px) {
            content: "";
            transform-origin: 50% 100%;
            background: var(--color-bright-crimson);
            transition: clip-path 0.3s,
                transform 0.3s cubic-bezier(0.2, 1, 0.8, 1);
            position: absolute;
            width: 100%;
            height: 1px;
            top: 105%;
            left: 0;
            pointer-events: none;
            clip-path: polygon(
                0% 0%,
                0% 100%,
                50% 100%,
                50% 0,
                50% 0,
                50% 100%,
                50% 100%,
                0 100%,
                100% 100%,
                100% 0%
            );
        }
    }
    &:hover::before {
        @media (min-width: 550px) {
            transform: translate3d(0, 3px, 0) scale3d(1.03, 2, 1);
            background: var(--color-sea-blue);
            clip-path: polygon(
                0% 0%,
                0% 100%,
                50% 100%,
                50% 0,
                50% 0,
                50% 100%,
                50% 100%,
                0 100%,
                100% 100%,
                100% 0%
            );
        }
    }
    span {
        display: inline-block;
        white-space: normal;
        transition: all 0.5s cubic-bezier(0.2, 1, 0.8, 1);
        word-break: break-all;
        color: var(--color-bright-crimson);
        text-decoration: underline;
        @media (min-width: 550px) {
            text-decoration: none;
        }
    }
    &:hover span {
        transform: translate3d(0, -1px, 0);
        color: var(--color-dark-crimson);
    }
`;
