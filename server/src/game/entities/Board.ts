import { Player } from "../../player/entities/Player";
export interface Element {
    x : number;
    y : number; 
}

export interface Board {
    size: number;
    elements: Array<Element>;
}