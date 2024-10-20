// @flow
import * as React from 'react';
import {Grid} from "@mui/system";
import {ColorSwatch} from "~/components/sm/colorSwatch";

export type colorPickerProps = {
    onClick : (color: string) => void
    name: string
};

const colors = [
    '#e81416',
    '#ffa500',
    '#faeb36',
    '#79c314',
    '#487de7',
    '#4b369d',
    '#70369d'

]
export function ColorPicker({name, onClick}: colorPickerProps) {

    return (
        <Grid size={12} container columnGap={2}>
            {colors.map((color) => {
                return (
                        <ColorSwatch name={name} onClick={() => onClick(color)} color={color}/>
                );
            })}
        </Grid>
    );
};