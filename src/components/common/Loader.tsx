import React from 'react'
import styled from 'styled-components'

function Loader() {
    return (
        <Main>
            <h2>Loading...</h2>
        </Main>
    )
}

export default Loader;

const Main = styled.div`
  display: flex;
  width: 350px;
`