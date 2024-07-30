import { Tab, TabList, Tabs } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { Link } from '../router';

export default function Main() {
  return (
    <>
      <Tabs>
        <TabList>
          <Link to="/">
            <Tab>최소경로</Tab>
          </Link>
          <Link to="/waypoint">
            <Tab>목적지 경유</Tab>
          </Link>
        </TabList>
        <Outlet />
      </Tabs>
    </>
  );
}
