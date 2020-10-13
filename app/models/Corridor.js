const ElectricalEquipment = require("./ElectricalEquipment");
const { ELECTRICAL_EQUIPMENTS } = require("../Constant");

class Corridor {
	constructor(electricalEquipments = []) {
		if (
			electricalEquipments.length !== 0 &&
			electricalEquipments.find(
				equipment => equipment.constructor !== ElectricalEquipment
			)
		) {
			throw new Error("equipment is not a type of ElectricalEquipment");
		}
		this.electricalEquipments = electricalEquipments;
		this.movement = false;
	}

	getElectricalEquipments() {
		return this.electricalEquipments;
	}

	setElectricalEquipment(electricalEquipment) {
		if (electricalEquipment.constructor !== ElectricalEquipment) {
			throw new Error("equipment is not a type of ElectricalEquipment");
		}
		return this.electricalEquipments.push(electricalEquipment);
	}

	setMovementDetected(hasMovementDetected) {
		this.movement = hasMovementDetected;
		hasMovementDetected
			? this.turnOnElectricalEquipment(ELECTRICAL_EQUIPMENTS.LIGHT)
			: this.turnOffElectricalEquipment(ELECTRICAL_EQUIPMENTS.LIGHT);
	}

	hasMovementDetected() {
		return this.movement;
	}

	turnOffElectricalEquipment(type) {
		const electricalEquipment = this.electricalEquipments.find(
			equipment => equipment.getType() === type
		);
		return electricalEquipment && electricalEquipment.switchOff();
	}

	turnOnElectricalEquipment(type) {
		const electricalEquipment = this.electricalEquipments.find(
			equipment => equipment.getType() === type
		);
		return electricalEquipment && electricalEquipment.switchOn();
	}

	isElectricalEquipmentOn(type) {
		const electricalEquipment = this.electricalEquipments.find(
			equipment => equipment.getType() === type
		);
		return electricalEquipment && electricalEquipment.getState();
	}

	getConsumption() {
		return this.electricalEquipments.reduce(
			(acc, equipment) => acc + equipment.getPower(),
			0
		);
	}
}

module.exports = Corridor;
