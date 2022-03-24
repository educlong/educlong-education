import React from 'react'
import { Link } from 'react-router-dom';
import styled,  { keyframes } from 'styled-components';

const PageNotFoundBody = styled.div`
  margin-bottom: -50px; 
  text-align: left;
  margin-top: -10px;
  min-height: 100%;
  box-sizing: border-box;
  height: 100%;
  background-color: #000000;
  background-image: radial-gradient(#11581E, #041607), url("https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif");
  background-repeat: no-repeat;
  background-size: cover;
  font-family: 'Inconsolata', Helvetica, sans-serif;
  font-size: 1.5rem;
  color: rgba(128, 255, 128, 0.8);
  text-shadow:
      0 0 1ex rgba(51, 255, 51, 1),
      0 0 2px rgba(255, 255, 255, 0.8);
`

const PageNotFoundNoise = styled.div`
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif");
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
  opacity: .02;
`

const scan404 = keyframes`
  0%        { background-position: 0 -100vh; }
  35%, 100% { background-position: 0 100vh; }
`
const PageNotFoundOverlay = styled.div`
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background:
      repeating-linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0,
      rgba(0, 0, 0, 0.3) 50%,
      rgba(0, 0, 0, 0) 100%);
  background-size: auto 4px;
  z-index: 1;

  ::before {
    content: "";
    pointer-events: none;
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
        0deg,
        transparent 0%,
        rgba(32, 128, 32, 0.2) 2%,
        rgba(32, 128, 32, 0.8) 3%,
        rgba(32, 128, 32, 0.2) 3%,
        transparent 100%);
    background-repeat: no-repeat;
    animation: ${scan404} 7.5s linear 0s infinite;
  }
`
const PageNotFoundTerminal  = styled.div`
  box-sizing: inherit;
  height: 100%;
  width: 1000px;
  max-width: 100%;
  padding: 4rem;
  text-transform: uppercase;
`

const PageNotFoundOutput  = styled.p`
  color: rgba(128, 255, 128, 0.8);
  text-shadow:
      0 0 1px rgba(51, 255, 51, 0.4),
      0 0 2px rgba(255, 255, 255, 0.8);

    ::before {
    content: "> ";
    }
`

/*
.input {
  color: rgba(192, 255, 192, 0.8);
  text-shadow:
      0 0 1px rgba(51, 255, 51, 0.4),
      0 0 2px rgba(255, 255, 255, 0.8);
}

.input::before {
  content: "$ ";
}
*/

const PageNotFoundA = styled(Link)`
  color: #fff;
  text-decoration: none;

  ::before {
    content: "[";
  }
  ::after {
    content: "]";
  }
`
const PageNotFoundErrorcode  = styled.span`
  color: white;
`
// Loading firebase data...
export const NotFoundPage = (props) => ( //props.loadingPage == true ? <display loading page> : <display error page>
    <PageNotFoundBody>
        <PageNotFoundNoise className="noise" />
        <PageNotFoundOverlay className="overlay" />
        <PageNotFoundTerminal className="terminal">
            <h1> {props.loadingPage ? "Loading " : "Error"} 
                <PageNotFoundErrorcode className="errorcode"> {props.loadingPage ? "Firebase Data..." : "404"} </PageNotFoundErrorcode>
            </h1>
            {
              props.loadingPage ? "" : 
              <PageNotFoundOutput className="output">
                The page you are looking for might have been removed, had its name changed or is temporarily unavailable.
              </PageNotFoundOutput>
            }
              {
                props.loadingPage ? "" : 
                <PageNotFoundOutput className="output">
                  Please try to  <PageNotFoundA to="/home">go back</PageNotFoundA> or <PageNotFoundA to="/home">return to the homepage</PageNotFoundA> .
                </PageNotFoundOutput>
              }
              {
                props.loadingPage ? "" :
                <PageNotFoundOutput className="output">Good luck.</PageNotFoundOutput>
              }
        </PageNotFoundTerminal>
    </PageNotFoundBody>
)

export default NotFoundPage