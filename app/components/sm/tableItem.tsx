// @flow
import * as React from 'react';
import {Grid, width} from "@mui/system";
import {Box, Button, Icon, IconButton, Typography} from "@mui/material";
import {RiArrowLeftFill, RiArrowRightLine} from "@remixicon/react";
import {createRef, ReactElement, useEffect, useRef} from "react";
import {PlayerDropdownItemClient} from "~/components/sm/playerDropdownItem.client";
import {useToggle} from "~/hooks/use-toggle";
import {TableDropdownButton} from "~/.client/tableDropdownButton";

type Props = {
    data: any[];
    children?: ReactElement<typeof PlayerDropdownItemClient>;
    //includesDropdown: () => void
};

export function TableItem(props: Props) {
    /*console.log(props.includesDropdown)
    if (props.children) props.includesDropdown()*/
    const [width, setWidth] = React.useState(0)
    const [opened, {on, off, toggle}] = useToggle(false)
    const ref = createRef<HTMLDivElement>();
    useEffect(() => {
        console.log('refchanged')
        setWidth(ref.current?.offsetWidth)
    }, [ref.current]);

    return (
        <Box >
            <Grid ref={ref}>
        <Grid minWidth={width + 16} maxHeight={'50'} maxWidth={'100%'} bgcolor={'aliceblue'} borderTop={1} container direction={'row'}>
            {props.data.map((item) => {
                return (
                    <Grid size={props.children ? 11 / (props.data.length) : 12 / props.data.length}>
                        <Typography sx={{height: '100%', marginTop: '1%'}}>{item}</Typography>
                    </Grid>
                );
            })}
            {props.children ?  <Grid size={1}>
                <TableDropdownButton toggle={toggle}/>
            </Grid> : null}
        </Grid>
            {opened ? props.children : null}
            </Grid>
        </Box>
    );
};