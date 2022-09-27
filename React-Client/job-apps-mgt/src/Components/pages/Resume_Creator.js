import React, { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";

import Personal_Info from "../Resume_Components/Personal_Info";
import Skills from "../Resume_Components/Skills";

const Resume_Creator = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };
  return (
    <Box>
      <Box>
        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab label="Personal-Info" />
          <Tab label="Skills" />
        </Tabs>
      </Box>
      <Box sx={{ padding: 2 }}>
        {tabIndex === 0 && (
          <Box>
            <Typography>Personal Info</Typography>
            <Personal_Info />
          </Box>
        )}
        {tabIndex === 1 && (
          <Box>
            <Typography>Skills</Typography>
            <Skills />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Resume_Creator;
