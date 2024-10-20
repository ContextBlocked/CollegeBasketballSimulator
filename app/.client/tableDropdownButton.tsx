// @flow
import * as React from 'react';
import {Box, IconButton} from "@mui/material";
import {RiArrowDropDownLine, RiArrowRightLine} from "@remixicon/react";
import {motion, useMotionValue, useSpring} from 'framer-motion';

type Props = {
    toggle: () => void
};

export function TableDropdownButton(props: Props) {
    const spring = useSpring(24)
    return (
        <Box>
            <IconButton size={'small'} onMouseEnter={() => spring.set(35)} onMouseLeave={() => spring.set(24)}
                        onClick={props.toggle} disableRipple sx={{
                maxHeight: '50', marginTop: '1%', "&.MuiButtonBase-root:hover": {
                    backgroundColor: "transparent"
                }
            }}>
                <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"
                            whileHover={{scale: 1.8}}>
                    <path d="M12 15.0006L7.75732 10.758L9.17154 9.34375L12 12.1722L14.8284 9.34375L16.2426 10.758L12 15.0006Z"></path>
                </motion.svg>
            </IconButton>
        </Box>
);
};