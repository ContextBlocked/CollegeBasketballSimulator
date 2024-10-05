import {Position} from "./data/positions";

interface props {
    min?: number;
    max?: number;
}
const defaultProp: props = {
    min: 0,
    max: 100,
}

export function uniform(a: number, b: number): number {
    return Math.random() * (b - a) + a;
}

export function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function getRandom(min: number = 0, max: number = 100): number{

    // @ts-ignore
    return Math.floor(Math.random() * (max - min) + min) + 1;
}
export function getHeightbyInch(inches: number): number{
    return inches * 12
}
export function getHeightbyCentimeter(cm: number): number{
    return Math.round((cm / 30.48) * 10) / 10
}
export function getCentimeterbyFeet(height: number): number{
    return height / 12
}
interface WeightedNumberProps {
    min?: number;
    max?: number;
    boost?: number;
}

export function calculateHeightRating(height: number, position: Position): number {
    const range = position.maxHeight - position.minHeight;
    const adjustedHeight = height - position.minHeight;
    return Math.round((adjustedHeight / range) * 100);
}
export function calculateWeightRating(weight: number, position: Position): number {
    const range = position.maxWeight - position.minWeight;
    const adjustedWeight = weight - position.minWeight;
    return Math.round((adjustedWeight / range) * 100);
}

export function getBoostRange(rating: number, max:number = 100): number {
    return (rating / max) - 1;
}

const defaultWeightedProps: WeightedNumberProps = {
    min: 0,
    max: 100,
    boost: .1, // 1 = no boost, 2 = lower boost, 0.1 = higher boost
}

export function generateWeightedNumber(props: WeightedNumberProps = defaultWeightedProps): number {
    const min = props.min ?? 0;
    const max = props.max ?? 100;
    const boost = props.boost ?? 1;

    // Generate a random number between 0 and 1
    let random = Math.random();

    // Apply a weighting function to make numbers in the middle more likely
    random = Math.pow(random, 2);

    // Adjust the result based on the boost parameter
    random = Math.pow(random, boost);

    // Scale the result to the desired range
    const result = Math.floor(random * (max - min) + min)
    console.log(result)
    return result;
}
