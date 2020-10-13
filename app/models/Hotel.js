const Floor = require('./Floor');

class Hotel {
	constructor(build) {
		this.floors = build.floors;
    this.name = build.name;
  }
  
  getFloors() {
    return this.floors;
  }

  setMovementIn(floorId, subCorridorId, status) {
    const floor = this.floors[floorId];
    if (!floor) {
      throw new Error("floor doesn't exist");
    }
    floor.setMovementDetected(subCorridorId, status)
  }

	static get Builder() {
    class Builder {
    
			constructor(name) {
        this.name = name;
        this.floors = {};
      }
      
      withFloor(floorNumber, floor) {
        if (floor.constructor !== Floor) {
          throw new Error("floor is not a type of Floor");
        }
				this.floors[floorNumber] = floor;
				return this;
      }
      
			build() {
				return new Hotel(this);
			}
		}
		return Builder;
	}
}

module.exports = Hotel;
