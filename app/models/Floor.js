const Listener = require('../controller/EventListener');
const Corridor = require('./Corridor');
const { ELECTRICAL_EQUIPMENTS } = require('../Constant');

class Floor {
	constructor(build) {
		this.corridors = build.corridors;
		this.subCorridors = build.subCorridors;
		this.rooms = build.rooms;
		this.listener = {};
	}

	setListener(listener) {
		if (listener.constructor !== Listener) {
			throw new Error("listener is not a type of Listener");
		}
		this.listener = listener
	}

	getCorridors() {
		return this.corridors;
	}

	getSubCorridors() {
		return this.subCorridors;
	}

	getRooms() {
		return this.rooms;
	}

	setMovementDetected(subCorridorId, status) {
		const subCorridor = this.subCorridors[subCorridorId - 1]
		if (!subCorridor) {
			throw new Error(`subcorridor with id ${subCorridorId} doesn't exist`)
		}
		subCorridor.setMovementDetected(status)
		this.listener.eventOccured(this);
	}

  noMovementsIntheSubCorridors() {
    return !this.subCorridors.find(subCorridor => subCorridor.hasMovementDetected());
  }

  areMovementsInAllTheSubCorridors() {
    return this.subCorridors
      .filter(subCorridor => subCorridor.hasMovementDetected()).length === this.subCorridors.length;
  }

  getConsumption() {
    const reducer = (acc, corridor) => acc + corridor.getConsumption();
    const corridorsConsumption = this.corridors.reduce(reducer, 0);
    const subCorridorsConsumption = this.subCorridors.reduce(reducer, 0);
    return corridorsConsumption + subCorridorsConsumption;
  }

  setToDefaultConfiguration() {
    this.subCorridors.forEach(subCorridor => {
      subCorridor.turnOnElectricalEquipment(ELECTRICAL_EQUIPMENTS.AC);
      subCorridor.turnOffElectricalEquipment(ELECTRICAL_EQUIPMENTS.LIGHT);
    });
  }

	static get Builder() {
		class Builder {
			constructor(corridors) {
				if (
					corridors.length !== 0 &&
					corridors.find(
						corridor => corridor.constructor !== Corridor
					)
				) {
					throw new Error("corridor is not a type of Corridor");
				}
				this.corridors = corridors;
				this.subCorridors = [];
				this.rooms = [];
			}

			withRoom(rooms) {
				this.rooms.push(rooms);
				return this;
			}

			withSubCorridor(subCorridor) {
				if (subCorridor.constructor !== Corridor) {
					throw new Error("subcorridor is not a type of Corridor");
				}
				this.subCorridors.push(subCorridor);
				return this;
			}

			withCorridor(corridor) {
				if (corridor.constructor !== Corridor) {
					throw new Error("corridor is not a type of Corridor");
				}
				this.corridors.push(corridor);
				return this;
			}

			build() {
				return new Floor(this);
			}
		}
		return Builder;
	}
}

module.exports = Floor;
