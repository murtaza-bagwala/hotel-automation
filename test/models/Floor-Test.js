const chai = require("chai");

const { expect } = chai;
const Floor = require("../../app/models/Floor");
const Corridor = require("../../app/models/Corridor");

describe("When creating a Floor using builder", () => {
	it("should return a new instance of floor", done => {
		const floor = new Floor.Builder([]).build();
		expect(floor.constructor).eq(Floor);
		done();
	});

	it("should throw an exception if corridor passed is not a type of Corridor", done => {
		expect(() => new Floor.Builder(['a'])).to.throw(
			"corridor is not a type of Corridor"
		);
		done();
  });
  
  it("should throw an exception if subCorridor passed is not a type of Corridor", done => {
		expect(() => new Floor.Builder([]).withSubCorridor('a')).to.throw(
			"subcorridor is not a type of Corridor"
		);
		done();
  });
  
  it("should throw an exception if listener passed is not a type of Listener", done => {
    const floor = new Floor.Builder([]).build();
		expect(() => floor.setListener({})).to.throw(
			"listener is not a type of Listener"
		);
		done();
	});
});

describe("when setMovementDetected is called on Floor Object", () => {
	it("should throw an exception if floor with floorId not found", done => {
    const corridor = new Corridor([]);
		const floor = new Floor.Builder([corridor]).build();
		const subCorridorId =  1;
		expect(() => floor.setMovementDetected(subCorridorId, true)).to.throw(
			"subcorridor with id 1 doesn't exist"
		);
		done();
	});
});

describe("when noMovementsIntheSubCorridors is called on Floor Object", () => {
	it("should return false if moments detected", done => {
    const subCorridor = new Corridor([]);
    subCorridor.setMovementDetected(true)
		const floor = new Floor.Builder([]).withSubCorridor(subCorridor).build();
    expect(floor.noMovementsIntheSubCorridors()).to.eq(false)
		done();
  });
  
  it("should return true if no moments detected", done => {
		const subCorridor = new Corridor([]);
		const floor = new Floor.Builder([]).withSubCorridor(subCorridor).build();
		expect(floor.noMovementsIntheSubCorridors()).to.eq(true);
		done();
	});
});

describe("when areMovementsInAllTheSubCorridors is called on Floor Object", () => {
	it("should return true if moments are detected in all the subcorridors", done => {
		const subCorridorOne = new Corridor([]);
    subCorridorOne.setMovementDetected(true);
    const subCorridorTwo = new Corridor([]);
		subCorridorTwo.setMovementDetected(true);
    const floor = new Floor.Builder([])
      .withSubCorridor(subCorridorOne)
      .withSubCorridor(subCorridorTwo)
      .build();
		expect(floor.areMovementsInAllTheSubCorridors()).to.eq(true);
		done();
	});

	it("should return false if no moments detected in some of the corridors", done => {
    const subCorridorOne = new Corridor([]);
    subCorridorOne.setMovementDetected(true)
    const subCorridorTwo = new Corridor([]);
    const floor = new Floor.Builder([])
      .withSubCorridor(subCorridorOne)
      .withSubCorridor(subCorridorTwo).build();
		expect(floor.areMovementsInAllTheSubCorridors()).to.eq(false);
		done();
	});
});

describe("when setMovementDetected is called on Floor Object", () => {
	it("should throw an exception if floor with floorId not found", done => {
		const corridor = new Corridor([]);
		const floor = new Floor.Builder([corridor]).build();
		const subCorridorId = 1;
		expect(() => floor.setMovementDetected(subCorridorId, true)).to.throw(
			"subcorridor with id 1 doesn't exist"
		);
		done();
	});
});
