const chai = require("chai");

const { expect } = chai;
const Hotel = require("../../app/models/Hotel");
const Floor = require("../../app/models/Floor");


describe("When creating a hotel using builder", () => {
  it("should return a new instance of hotel", done => {
    const floor = new Floor.Builder([]).build();
    const hotel = new Hotel.Builder("New Hotel")
      .withFloor(1, floor)
      .build();
    expect(hotel.constructor).eq(Hotel);
    done();
  });
  
  it("should throw an exception if floor passed is not a type of floor", done => {
    expect(() => new Hotel.Builder("Murtaza").withFloor(1, "f")).to.throw(
			"floor is not a type of Floor"
		);
    done();
  });
});
  
describe("when setMovementIn is called on Hotel Object", () => {
  
  it("should throw an exception if floor with floorId not found", done => {
		const floor = new Floor.Builder([]).build();
    const hotel = new Hotel.Builder("New Hotel").withFloor(1, floor).build();
    const floorId = 2;
    const subCorridorId = 0;
		expect(() => hotel.setMovementIn(floorId, subCorridorId, true)).to.throw(
			"floor doesn't exist"
		);
		done();
  });
});
