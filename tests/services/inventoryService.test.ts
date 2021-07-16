import { expect } from "chai";
import { InMemoryRepository } from "../../src/repositories/inMemoryRepository";
import { RepositoryFactory } from "../../src/repositories/repository";
import { gamestateServiceSingleton as gamestateService } from "../../src/services/gamestateService";
import { inventoryServiceSingleton as inventoryService } from "../../src/services/inventoryService";
import { itemsServiceSingleton as itemsService } from "../../src/services/itemsService";

describe('InventoryService_Test', () => {
    RepositoryFactory.setRepository(new InMemoryRepository());
    
    it('add should increase item count by default by 1', () => {
        gamestateService.reset();
        let item = itemsService.getItem('mushroomSeed');
        // Initial item addition
        inventoryService.add(item);
        let initialCount = inventoryService.get(item).count;
        // Increase by 1
        inventoryService.add(item);

        expect(inventoryService.get(item).count).to.equal(initialCount + 1, 'Count was not increased by 1.');
    });

    it('add should increase item count by provided amount', () => {
        gamestateService.reset();
        let item = itemsService.getItem('mushroomSeed');
        // Initial item addition
        inventoryService.add(item);
        let initialCount = inventoryService.get(item).count;
        // Increase by 55
        inventoryService.add(item, 55);
        expect(inventoryService.get(item).count).to.equal(initialCount + 55, 'Count was not increased by 55.');

        initialCount = inventoryService.get(item).count;
        // Increase by 23
        inventoryService.add(item, 23);
        expect(inventoryService.get(item).count).to.equal(initialCount + 23, 'Count was not increased by 23.');
    });

    it('add must not duplicate items in inventory', () => {
        gamestateService.reset();
        let item = itemsService.getItem('mushroomSeed');
        // Add item with 2 separate adds
        inventoryService.add(item);        
        inventoryService.add(item);

        // Check if item is added multiple times to the gamestate
        let itemCount = 0;
        gamestateService.data.items.forEach((gamestateItem)=>{
            if (gamestateItem.item.id == item.id) {
                itemCount++;
            }
        });

        expect(itemCount).to.equal(1, 'Item was not found in gamestate or is duplicated');
    });

    it('remove should decrease the item count by 1 by default', () => {
        gamestateService.reset();
        let item = itemsService.getItem('mushroomSeed');
        // Initial item addition
        inventoryService.add(item, 50);
        let initialCount = inventoryService.get(item).count;
        
        inventoryService.remove(item);
        expect(inventoryService.get(item).count).to.equal(initialCount - 1, 'Count was not decreased by 1.');
    });

    it('remove should decrease the item count by provided amount', () => {
        gamestateService.reset();
        let item = itemsService.getItem('mushroomSeed');
        // Initial item addition
        inventoryService.add(item, 500);
        let initialCount = inventoryService.get(item).count;
        
        inventoryService.remove(item, 44);
        expect(inventoryService.get(item).count).to.equal(initialCount - 44, 'Count was not decreased by 44.');
        initialCount = inventoryService.get(item).count;
        inventoryService.remove(item, 23);
        expect(inventoryService.get(item).count).to.equal(initialCount - 23, 'Count was not decreased by 23.');
    });

    it('remove should remove items from state if count is 0', () => {
        gamestateService.reset();
        let item = itemsService.getItem('mushroomSeed');
        
        inventoryService.add(item);
        inventoryService.remove(item);
        
        // Check if item is added multiple times to the gamestate
        let itemCount = 0;
        gamestateService.data.items.forEach((gamestateItem)=>{
            if (gamestateItem.item.id == item.id) {
                itemCount++;
            }
        });

        expect(itemCount).to.equal(0, 'Item was not dropped from gamestate');
    });

    it('dump should drop item from gamestate', () => {
        gamestateService.reset();
        let item = itemsService.getItem('mushroomSeed');
        
        inventoryService.add(item);
        inventoryService.dump(item);
        
        // Check if item is added multiple times to the gamestate
        let itemCount = 0;
        gamestateService.data.items.forEach((gamestateItem)=>{
            if (gamestateItem.item.id == item.id) {
                itemCount++;
            }
        });

        expect(itemCount).to.equal(0, 'Item was not dropped from gamestate');
    });

    it('list should return items from the inventory', () => {
        gamestateService.reset();
        let item = itemsService.getItem('mushroomSeed');
        
        inventoryService.add(item);

        expect(inventoryService.list().length).to.equal(1, 'Returned Items are wrong');
    });

    it('list should return multiple items from the inventory', () => {
        gamestateService.reset();
        let mushroomSeed = itemsService.getItem('mushroomSeed');
        let leekSeed = itemsService.getItem('leekSeed');
        
        inventoryService.add(mushroomSeed);
        inventoryService.add(leekSeed);

        expect(inventoryService.list().length).to.equal(2, 'Returned Items are wrong');
    });

    it('get should return an item from the inventory', () => {
        gamestateService.reset();
        let mushroomSeed = itemsService.getItem('mushroomSeed');
        
        inventoryService.add(mushroomSeed);
        let item = inventoryService.get(mushroomSeed);

        expect(item).not.equal(null);
        expect(item.item.id).to.equal(mushroomSeed.id);
    });

    it('get should return null for an item that is not in the inventory', () => {
        gamestateService.reset();
        let mushroomSeed = itemsService.getItem('mushroomSeed');
        
        let item = inventoryService.get(mushroomSeed);

        expect(item).to.equal(null);
    });
});