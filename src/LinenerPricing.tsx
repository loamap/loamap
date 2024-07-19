import { Box, Button, Select, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { dijkstra, graph } from './Graph';

const locationNames: { [key: string]: string } = {
  Luterra: '루테란',
  Tortoyk: '토토이크',
  Anikka: '애니츠',
  Arthetine: '아르데타인',
  Shushire: '슈샤이어',
  NorthVern: '베른북부',
  Rohendel: '로헨델',
  Feiton: '페이튼',
  Yorn: '욘',
  Punika: '파푸니카',
  SouthVern: '베른남부',
  Pleccia: '플레체',
  Rowen: '로웬',
  Voldis: '볼다이크',
  Kurzan: '쿠르잔',
};

export const LinersPricing = () => {
  const [from, setFrom] = useState<string>('Luterra');
  const [to, setTo] = useState<string>('Luterra');
  const [result, setResult] = useState<{ cost: number; path: string[] } | null>(
    null
  );

  const handleCalculate = () => {
    const { cost, path } = dijkstra(graph, from, to);
    setResult({ cost, path });
  };

  return (
    <>
      <Box className="p-4">
        <Box className="mb-4">
          <Select value={from} onChange={e => setFrom(e.target.value)}>
            {Object.keys(graph).map(location => (
              <option key={location} value={location}>
                {locationNames[location]}
              </option>
            ))}
          </Select>
        </Box>
        <Box className="mb-4">
          <Select value={to} onChange={e => setTo(e.target.value)}>
            {Object.keys(graph).map(location => (
              <option key={location} value={location}>
                {locationNames[location]}
              </option>
            ))}
          </Select>
        </Box>
        <Button colorScheme="teal" onClick={handleCalculate}>
          비용 계산
        </Button>
        {result !== null && (
          <VStack className="mt-4" align="start">
            <Text>
              {locationNames[from]}에서 {locationNames[to]}까지의 여행 비용은{' '}
              {result.cost} 원 입니다.
            </Text>
            <Text>
              경로: {result.path.map(loc => locationNames[loc]).join(' -> ')}
            </Text>
          </VStack>
        )}
      </Box>
    </>
  );
};
