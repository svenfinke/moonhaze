import { EmptyPlot } from "../../plots/emptyPlot";
import { IPlot } from "../../plots/plotType";
import { ItemType } from "../itemType";

export class TurnipSeedItem implements ItemType {
    id(): string { return "turnipSeed"; }
    name(): string { return "Turnip Seed"; }
    value(): number { return 10; }
    canBePlanted(): boolean { return true; }
    getPlot(): CallableFunction { return EmptyPlot; }
    getType(): string { return "vegetable"; }

    count: number = 0;
}