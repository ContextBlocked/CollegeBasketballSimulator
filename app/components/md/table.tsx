// @flow
import * as React from 'react';
import {Paper, Stack, Typography} from "@mui/material";
import {Box, Grid} from "@mui/system";
import {TableItem} from "~/components/sm/tableItem";
import {generateRoster} from "../../../util/core/functions/teams/generateRoster";
import {ReactElement, ReactNode, useEffect} from "react";
import {useToggle} from "~/hooks/use-toggle";
import {NavLink} from "@remix-run/react";
import {Simulate} from "react-dom/test-utils";
import drop = Simulate.drop;

type Props = {
columnNames: string[]
data?: any[]
    children?: ReactElement<typeof TableItem>[] | ReactElement<typeof TableItem>
    emptyMessage?: string
    dropDownArea?: boolean
};

export function Table(props: Props) {
    let dropDownArea: boolean = props.dropDownArea || false
    const [amountOfChildren, setAmountOfChildren] = React.useState(0)
    let amountOfColumns = props.columnNames.length;
   /* const [toggled, {on, off, toggle}] = useToggle(false, {
        onTrue: () => //console.log('on'),
        onFalse: () => //console.log('off')
    })
    //console.log(toggled)*/
    let children = [props.children]


    ////console.log(amountOfColumns)
    const tableItemIfChildrenExist = (data: any): ReactNode => {
       return (children ? <TableItem data={Array.isArray(data) ? data : typeof data === "function" ? data : [data]}><Box/></TableItem> : <TableItem data={Array.isArray(data) ? data : typeof data === "function" ? data : [data]}></TableItem>
    )}


    useEffect(() => {
        if (Array.isArray(props.children)) {
            props.children.forEach((child) => {
                if (child === undefined) {
                    setAmountOfChildren(0);
                } else {
                    setAmountOfChildren(amountOfColumns++);
                }
            })
        } else if (props.children) {
            setAmountOfChildren(1);
        } else {
            setAmountOfChildren(0);
        }
        //console.log(props.children)
        ////console.log(amountOfChildren);
    }, [props.children]);
    //console.log(amountOfChildren);
    ////console.log(amountOfChildren);
    ////console.log(!props.children)
   // //console.log(amountOfChildren);
    ////console.log(amountOfChildren === 0)
    ////console.log(!props.data && amountOfChildren === 0);
    ////console.log(props.data);
    //const s = props.children as ReactElement<typeof TableItem>[]
    ////console.log(s.every((child) => child === undefined))

    return (
        <Grid textAlign={'center'} container marginTop={10} size={'grow'}>
            <Paper elevation={12} sx={{minWidth: '70%', minHeight: 400, maxHeight: 600, maxWidth: '70%'}}>
                <Box maxHeight={'10%'}>

                    <Grid position={'sticky'} maxHeight={'30'} maxWidth={'100%'} bgcolor={'aliceblue'} container direction={'row'}>
                        {props.columnNames.map((name, index: number) => {
                            return (
                                <Grid marginLeft={index === 0 ? 0 : 0} size={ dropDownArea ? 11 / amountOfColumns : 12 / amountOfColumns}>
                                    <Typography marginLeft={index === 0 ? 1 : 0} variant={'button'}>{name}</Typography>
                                </Grid>
                            );
                        })}
                    </Grid>

                </Box>
                <Box maxHeight={'95%'} overflow={'hidden'} sx={{overflowY: 'scroll'}}>
                    {props.data?.map((data) => {
                        //console.log(props.children)
                        return tableItemIfChildrenExist(data)

                    })}
                    {children}
                    {!props.data && amountOfChildren === 0 ? <Box><Typography textTransform={'capitalize'} variant={'h4'} color={'textDisabled'} sx={{paddingTop: '10%'}}>Teams you create will appear here...</Typography>
                <NavLink style={{textDecoration: 'underline'}} to={'/game/teams/createTeam'}>Create a Team</NavLink></Box> : null
            }
                </Box>
            </Paper>
        </Grid>
    );
};