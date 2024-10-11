import {Position, Positions} from "../../data/positions";
import {firstNames, lastNames, nationalities} from "../../data/names";
import {getRandom} from "../../numbers";

export interface IPreHuman {
    position?: Position
    firstName?: string;
    lastName?: string,
    Age?: number,
    height?: number, //Centimeters
    weight?: number,
    Nationality?: string,
}
export interface IHuman {
    firstName: string;
    lastName: string,
    Age: number,
    height: number, //Centimeters
    weight: number,
    Nationality: string,
}
function generateFirstName(): string { return firstNames[getRandom(0,100) - 1]}
function generateLastName(): string { return lastNames[getRandom(0,100) - 1]}
export function generateRandomHuman(props: IPreHuman) {
    const num = getRandom(0,5)
    const position = props.position ?? Positions.find((position) => position.id === num)
    if (!props.firstName) props.firstName = generateFirstName()
    if (!props.lastName) props.lastName = generateLastName()
    if (!props.Age) props.Age = getRandom(18, 25) - 1
    if (!props.height) props.height = getRandom(position?.minHeight, position?.maxHeight)
    if (!props.weight) props.weight = getRandom(position?.minWeight, position?.maxWeight)
    if (!props.Nationality) props.Nationality = nationalities[getRandom(0,50) - 1]
    return props as IHuman
}