import styled from 'styled-components';

// Flex Elements
export const Flex = styled.div`
  display: flex;
  width: 100%;
`;
export const FlexRowC = styled(Flex)`
  justify-content: center;
  align-items: center;
`;
export const FlexCol = styled(FlexRowC)`
  flex-direction: column;
`;
export const WrapRow = styled(FlexRowC)`
  flex-wrap: wrap;
`;
export const FlexRowSpace = styled(Flex)`
  justify-content: space-around;
  align-items: center;
`;
