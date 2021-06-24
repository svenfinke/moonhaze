import { IPlot } from "../plots/plotType";

export abstract class ItemType{
    abstract id(): string
    abstract name(): string
    abstract value(): number
    abstract canBePlanted(): boolean
    abstract getPlot(): CallableFunction
    abstract getType(): string

    count: number = 0
}