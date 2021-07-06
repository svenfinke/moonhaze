import { expect } from "chai";
import { ItemsService } from "../../src/services/itemsService";
import { ItemType } from "../../src/types/items/itemType";
import { ShopItemType } from "../../src/types/items/shopItemType";

describe('ItemsService_Test', () => {
    var itemsService = ItemsService.getItemsService();
    it('getShopItems should return an array of shop items without an argument', () => {
        const result = itemsService.getShopItems();

        expect(typeof result).to.equal(typeof [], 'The result is not an array');
        expect(result.length).to.greaterThanOrEqual(1, 'The result is empty');
        expect(typeof result[0]).to.equal(typeof new ShopItemType(new ItemType()), 'The result is not a ShopItemType object');
    });

    it('getShopItems should return an array of shop items with a given shop name', () => {
        const result = itemsService.getShopItems('farmer');

        expect(typeof result).to.equal(typeof [], 'The result is not an array');
        expect(result.length).to.greaterThanOrEqual(1, 'The result is empty');
        expect(typeof result[0]).to.equal(typeof new ShopItemType(new ItemType()), 'The result is not a ShopItemType object');
    });

    it('getShopItems should not return an array of shop items with a unknown shop name', () => {
        const result = itemsService.getShopItems('some_random_name');

        expect(typeof result).to.equal(typeof [], 'The result is not an array');
        expect(result.length).to.equal(0, 'The result is not empty');
    });

    it('getItems should return an array of items', () => {
        const result = itemsService.getItems();

        expect(typeof result).to.equal(typeof [], 'The result is not an array');
        expect(result.length).to.greaterThanOrEqual(1, 'The result is empty');
        expect(typeof result[0]).to.equal(typeof new ItemType(), 'The result is not a ItemType object');
    });
});