import { expect } from "chai";
import { InMemoryRepository } from "../../src/repositories/inMemoryRepository";
import { RepositoryFactory } from "../../src/repositories/repository";
import { gamestateServiceSingleton as gamestateService } from "../../src/services/gamestateService";
import { shopServiceSingleton as shopService } from "../../src/services/shopService";
import { InsufficientBalanceError, ItemNotFoundError } from "../../src/utilities/exceptions";

describe('ShopService_Test', () => {
    RepositoryFactory.setRepository(new InMemoryRepository());
    
    it('listItems should return shop items without provided shop', () => {
        gamestateService.reset();
        let items = shopService.listItems();

        expect(items.length).to.greaterThanOrEqual(1);
    });

    it('listItems should return shop items', () => {
        gamestateService.reset();
        let items = shopService.listItems('farmer');

        expect(items.length).to.greaterThanOrEqual(1);
    });

    it('buyItems should reduce balance by items worth', () => {
        gamestateService.reset();
        
        let initialBalance = 200000;
        gamestateService.data.balance = initialBalance;
        let items = shopService.listItems();
        let item = items[0];

        shopService.buyItems(item.item.id, 5);

        expect(gamestateService.data.balance).to.equal(initialBalance - (item.item.price * 5));
    });

    it('buyItems should put items into inventory', () => {
        gamestateService.reset();
        gamestateService.data.balance = 200000;
        let items = shopService.listItems();
        let item = items[0];
        shopService.buyItems(item.item.id, 5);

        expect(gamestateService.data.items.length).to.equal(1);
        expect(gamestateService.data.items[0].count).to.equal(5);
    });

    

    it('buyItems should fail if balance is too low', () => {
        gamestateService.reset();
        gamestateService.data.balance = 0;
        let items = shopService.listItems();
        let item = items[0];

        expect(
                shopService.buyItems.bind(shopService, item.item.id, 1)
            ).to.throw(InsufficientBalanceError);
    });

    it('buyItems should fail if itemId is not found', () => {
        gamestateService.reset();

        expect(shopService.buyItems.bind(shopService, 'randomItemIdThing')).to.throw(ItemNotFoundError);
    });
});