import styled from 'styled-components'
import BreakPoints from './BreakPoints'

export default styled.div`
  display: flex;
  justify-content: center;
  ${BreakPoints({
    padding: ['50px 0', '100px 0', '150px 0'],
  })};
  margin: 0 20%;
`
