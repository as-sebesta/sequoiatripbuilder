import React from 'react';
import styled from '@emotion/styled';

interface SequoiaGaugeProps {
  currentAmount: number;
  targetAmount: number;
}

const GaugeContainer = styled.div`
  width: 400px;
  margin: 0 auto;
  position: relative;
  height: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GaugeSection = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  margin-top: 220px;
`;

const TreeTrunk = styled.div<{ fillPercentage: number }>`
  width: 140px;
  height: 600px;
  background: ${props => `linear-gradient(
    to top,
    #8B4513 ${props.fillPercentage}%,
    #f4f4f4 ${props.fillPercentage}%
  )`};
  border: 6px solid #5D4037;
  border-radius: 30px;
  position: relative;
  box-shadow: inset -10px 0 20px rgba(0,0,0,0.2);
  z-index: 1;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 20px,
      rgba(139, 69, 19, 0.1) 20px,
      rgba(139, 69, 19, 0.1) 40px
    );
    border-radius: 24px;
    opacity: ${props => props.fillPercentage > 0 ? 1 : 0};
    transition: opacity 0.3s ease;
  }
`;

const MarkerContainer = styled.div`
  position: absolute;
  left: -90px;
  top: 0;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  padding: 6px 0;
`;

const Marker = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #2c3e50;
  font-weight: bold;
  font-size: 14px;
  white-space: nowrap;

  &:after {
    content: '';
    height: 2px;
    width: 10px;
    background-color: #2c3e50;
  }
`;

const TreeTop = styled.div`
  position: absolute;
  top: -200px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 220px;
  z-index: 2;

  &:before, &:after {
    content: '';
    position: absolute;
    background: linear-gradient(160deg, #2E5A1C 60%, #1B4400);
  }

  &:before {
    width: 200px;
    height: 160px;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      50% 0%,
      85% 30%,
      100% 70%,
      85% 90%,
      50% 100%,
      15% 90%,
      0% 70%,
      15% 30%
    );
    box-shadow: -5px 5px 15px rgba(0,0,0,0.2);
  }

  &:after {
    width: 160px;
    height: 130px;
    bottom: 80px;
    left: 20px;
    clip-path: polygon(
      50% 0%,
      85% 30%,
      100% 70%,
      85% 90%,
      50% 100%,
      15% 90%,
      0% 70%,
      15% 30%
    );
    box-shadow: -5px 5px 15px rgba(0,0,0,0.2);
  }
`;

const TreeTopLayer = styled.div`
  position: absolute;
  width: 120px;
  height: 100px;
  bottom: 140px;
  left: 40px;
  background: linear-gradient(160deg, #2E5A1C 60%, #1B4400);
  clip-path: polygon(
    50% 0%,
    85% 30%,
    100% 70%,
    85% 90%,
    50% 100%,
    15% 90%,
    0% 70%,
    15% 30%
  );
  box-shadow: -5px 5px 15px rgba(0,0,0,0.2);
  z-index: 3;
`;

const AmountDisplay = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
  margin-top: 20px;
  text-align: center;
  background: rgba(255, 255, 255, 0.9);
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const SequoiaGauge: React.FC<SequoiaGaugeProps> = ({ currentAmount, targetAmount }) => {
  const fillPercentage = Math.min((currentAmount / targetAmount) * 100, 100);
  const markers = Array.from({ length: 11 }, (_, i) => i * 500);

  return (
    <GaugeContainer>
      <GaugeSection>
        <TreeTop>
          <TreeTopLayer />
        </TreeTop>
        <TreeTrunk fillPercentage={fillPercentage}>
          <MarkerContainer>
            {markers.map((amount, index) => (
              <Marker key={index}>
                ${amount.toLocaleString()}
              </Marker>
            ))}
          </MarkerContainer>
        </TreeTrunk>
      </GaugeSection>
      <AmountDisplay>
        ${currentAmount.toLocaleString()} / ${targetAmount.toLocaleString()}
      </AmountDisplay>
    </GaugeContainer>
  );
};

export default SequoiaGauge; 