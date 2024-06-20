import {Box, ChakraProvider, Flex, Select, Spacer, Text} from "@chakra-ui/react";
import {useMemo, useState} from "react";
import linersPricing from "./assets/liners-pricing.ts";

function App() {
  const [from, setFrom] = useState<string>('Luterra')
  const [to, setTo] = useState<string>()

const price = useMemo(() => {
    return to ? linersPricing[from][to] : 0
  }, [from, to])

  return (
    <ChakraProvider>

      <Flex minWidth='max-content' alignItems='center'>
        <Box>
          <Text>From</Text>
          <Select
            onChange={(e) => {
              setFrom(e.target.value)
            }}>
            {Object.keys(
              linersPricing
            ).map((key) => (
              <option key={key}>{key}</option>
            ))}
          </Select>
        </Box>
        <Spacer/>
        <Box>
          <Text>To</Text>
          <Select onChange={(e) => setTo((e.target.value))}
                  defaultChecked={false}
          value={to}>
            {Object.keys(linersPricing[from]).map((to) => (
              <option key={to} label={to} value={to}/>
            ))}
          </Select>
        </Box>
      </Flex>
      <Text>{price}</Text>
    </ChakraProvider>
  );
}

export default App;
