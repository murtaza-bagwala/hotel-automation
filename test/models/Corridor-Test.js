const chai = require("chai");

const { expect } = chai;
const ElectricalEquipment = require('../../app/models/ElectricalEquipment');
const Corridor = require("../../app/models/Corridor");

describe("When creating a Corridor", () => {
  it("should return a new instance of Corridor", done => {
    const electricalEquipment = new ElectricalEquipment('light', 5, true);
    const corridor = new Corridor([electricalEquipment]);
		expect(corridor.constructor).eq(Corridor);
		done();
	});

  it("should throw an exception if equipment passed is not a type of ElectricalEquipment", done => {
		expect(() => new Corridor(["a"])).to.throw(
			"equipment is not a type of ElectricalEquipment"
		);
		done();
	});
});

describe("when turnOffElectricalEquipment is called on Corridor Object", () => {
	it("it turns off the device with the mentioned type", done => {
		const electricalEquipment = new ElectricalEquipment("light", 5, true);
    const corridor = new Corridor([electricalEquipment]);
    
    corridor.turnOffElectricalEquipment('light');

    expect(electricalEquipment.getState()).to.eq(false);
		done();
	});
});

describe("when turnOnElectricalEquipment is called on Corridor Object", () => {
	it("it turns on the device with the mentioned type", done => {
		const electricalEquipment = new ElectricalEquipment("AC", 5);
		const corridor = new Corridor([electricalEquipment]);

		corridor.turnOnElectricalEquipment("AC");

		expect(electricalEquipment.getState()).to.eq(true);
		done();
	});
});

describe("when isElectricalEquipmentOn is called on Corridor Object", () => {
	it("should return true if equipment is on", done => {
		const electricalEquipment = new ElectricalEquipment("AC", 5, true);
		const corridor = new Corridor([electricalEquipment]);

		expect(corridor.isElectricalEquipmentOn('AC')).to.eq(true);
		done();
	});
});

describe("when getConsumption is called on Corridor Object", () => {
	it("should return total consumption by all the electrical equipments", done => {
    const lightOne = new ElectricalEquipment("light", 5, true);
    const lightTwo = new ElectricalEquipment("light", 5, false);
    const AC = new ElectricalEquipment("AC", 10, true);
		const corridor = new Corridor([lightOne, lightTwo, AC]);

		expect(corridor.getConsumption()).to.eq(15);
		done();
	});
});
