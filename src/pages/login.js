import { Box } from '@mui/material';
import { useState } from 'react';
import Registration from './signup';
import UserLogin from "./LoginReg"

const TabPanel = (props) => {
  const { children, value, index } = props;
  return (
    <div role='index-two' hidden={value !== index}>
      {
        value === index && (
          <Box>{children}</Box>
        )
      }
    </div>
  )
}
const LoginReg = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  return <>

            <TabPanel value={value} index={0}>
              <UserLogin />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Registration />
            </TabPanel>

  </>;
};

export default LoginReg;