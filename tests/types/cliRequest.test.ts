import { expect } from "chai";
import { spy } from "sinon";
import { GameController } from "../../src/controller/gameController";
import { CliRequest } from "../../src/types/cliRequest";

describe('CliRequest_Test', () => {
    it('should parse without parameters', () => {
        const cliRequest = new CliRequest([]);

        expect(cliRequest.controller).to.eql('index');
        expect(cliRequest.action).to.eql('index');
    });

    it('should parse with only controller', () => {
        const cliRequest = new CliRequest([
            "pwd",
            "bin_file",
            "test_controller"
        ]);

        expect(cliRequest.controller).to.eql('test_controller');
    });
    
    it('should parse with controller and action', () => {
        const cliRequest = new CliRequest([
            "pwd",
            "bin_file",
            "test_controller",
            "test_action"
        ]);

        expect(cliRequest.controller).to.eql('test_controller');
        expect(cliRequest.action).to.eql('test_action');
    });

    it('should parse argument like "--test=value"', () => {
        const cliRequest = new CliRequest([
            "pwd",
            "bin_file",
            "test_controller",
            "test_action",
            "--test=value"
        ]);
        
        expect(cliRequest.parameters).has.key("test");
        expect(cliRequest.parameters["test"]).to.eql("value");
    });

    it('should parse argument like "--test value"', () => {
        const cliRequest = new CliRequest([
            "pwd",
            "bin_file",
            "test_controller",
            "test_action",
            "--anotherTest",
            "bigValue"
        ]);
        
        expect(cliRequest.parameters).has.key("anotherTest");
        expect(cliRequest.parameters["anotherTest"]).to.eql("bigValue");
    });
});