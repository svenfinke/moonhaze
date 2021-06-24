import { EmptyPlot } from "../../plots/emptyPlot";
import { IPlot } from "../../plots/plotType";
import { ItemType } from "../itemType";

export class StrawberrySeedItem implements ItemType {
    id(): string { return "strawberrySeed"; }
    name(): string { return "Strawberry Seed"; }
    value(): number { return 100; }
    canBePlanted(): boolean { return true; }
    getPlot(): CallableFunction { return EmptyPlot; }
    getType(): string { return "fruit"; }

    count: number = 0;
}