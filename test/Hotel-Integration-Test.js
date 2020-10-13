/* eslint-disable no-unused-expressions */
const chai = require("chai");

const { expect } = chai;
const Hotel = require('../app/models/Hotel')
const Floor = require("../app/models/Floor");
const Corridor = require("../app/models/Corridor");
const ElectricalEquipment = require("../app/models/ElectricalEquipment");

const EventListener = require("../app/controller/EventListener");
const ElectricityEquipmentController = require("../app/controller/ElectricityEquipmentController");

describe("When verifying Hotel electrcity consumption", () => {
  const controller = new ElectricityEquipmentController();
	const eventListener = new EventListener(controller);

	const mainLight = new ElectricalEquipment("light", 5, true);
	const subCorridorOneLight = new ElectricalEquipment("light", 5);
	const subCorridorTwoLight = new ElectricalEquipment("light", 5);

	const mainAC = new ElectricalEquipment("AC", 10, true);
	const subCorridorOneAC = new ElectricalEquipment("AC", 10, true);
	const subCorridorTwoAC = new ElectricalEquipment("AC", 10, true);

	const corridor = new Corridor([mainLight, mainAC]);
	const subCorridorOne = new Corridor([subCorridorOneLight, subCorridorOneAC]);
	const subCorridorTwo = new Corridor([subCorridorTwoLight, subCorridorTwoAC]);

	const floor = new Floor.Builder([corridor])
		.withSubCorridor(subCorridorOne)
		.withSubCorridor(subCorridorTwo)
		.build();

	floor.setListener(eventListener);

  const hotel = new Hotel.Builder("Ibis").withFloor(1, floor).build();
  
  
  describe("When system is in default state", () => {
    it("consumes a power equals to max allowed consumption", done => {
      expect(Object.keys(hotel.getFloors()).length).eq(1);
      expect(hotel.getFloors()[1].getConsumption()).eq(35);
      
      done();
    });
  });

  describe("when movement occurs in 1st floor and in one sub corridor", () => {
    it("turns off the AC of one of the subcorridor and calculates the power consumption less than max allowed consumption", done => {
			const floorId = 1;
			const subCorridorId = 1;
			hotel.setMovementIn(floorId, subCorridorId, true);

      expect(hotel.getFloors()[1].getConsumption()).eq(30);
      expect(subCorridorTwoAC.getState()).to.eq(false);

			done();
		});
  });
  
  describe("when movement occurs in 1st floor and in all the sub corridor", () => {
		it("turns off the AC of one of the subcorridor and calculates the power consumption equals to max allowed consumption", done => {
			const floorId = 1;
			const subCorridorId = 2;
      hotel.setMovementIn(floorId, subCorridorId, true);
      
      expect(hotel.getFloors()[1].getConsumption()).eq(35);
      expect(subCorridorTwoAC.getState()).to.eq(false);

			done();
		});
  });
  
  describe("when no movement occurs in 1st floor", () => {
    it("calculates the default power consumption", done => {
      
			const floorId = 1;
			const subCorridorId = 1;
      hotel.setMovementIn(floorId, subCorridorId, false);
      hotel.setMovementIn(floorId, subCorridorId + 1, false);

      expect(hotel.getFloors()[1].getConsumption()).eq(35);
      expect(subCorridorTwoAC.getState()).to.eq(true);
      expect(subCorridorOneAC.getState()).to.eq(true);
      expect(subCorridorTwoLight.getState()).to.eq(false);
      expect(subCorridorOneLight.getState()).to.eq(false);
      

			done();
		});
	});
});
