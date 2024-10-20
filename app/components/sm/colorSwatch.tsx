// @flow
import * as React from 'react';
import {Button} from "@mui/base/Button";
import {colorPickerProps} from "~/components/md/colorPicker";

type Props = {
    color?: string
    size?: [number, number],
    onClick: () => void
};

export function ColorSwatch({name, onClick, color, size}: colorPickerProps & Props) {
    return (
        <Button name={name} onClick={onClick} style={{backgroundColor: color ?? '#F4A698'}} className={'btn'} ></Button>
    );
};