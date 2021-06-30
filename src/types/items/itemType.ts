export class ItemType{
    id: string
    value: number
    price: number
    type: string
    metadata: object | SeedMetadataType
}

export class SeedMetadataType {
    growTimeInDays: number
    produceCount: number
    produceItem: ItemType | string
    byproductCount: number = 0
    byproductItem: ItemType | string | null
    byproductChance: number = 0
    Condition: string[] | null
}