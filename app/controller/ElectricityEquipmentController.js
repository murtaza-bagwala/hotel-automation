const Controller = require("./Controller");
const {
	ELECTRICAL_EQUIPMENTS,
	ELECTRICAL_EQUIPMENTS_POWER
} = require("../Constant");
class ElectricalEquipmentController extends Controller {
	constructor() {
		super();
	}

	computeConsumption(floor) {
		if (floor.noMovementsIntheSubCorridors()) {
			return floor.setToDefaultConfiguration();
		}

		if (floor.areMovementsInAllTheSubCorridors()) {
			while (floor.getConsumption() > this.maxAllowedConsumption(floor)) {
				const subCorridor = floor
					.getSubCorridors()
					.find(subCorridor =>
						subCorridor.isElectricalEquipmentOn(ELECTRICAL_EQUIPMENTS.AC)
					);
				subCorridor.turnOffElectricalEquipment(ELECTRICAL_EQUIPMENTS.AC);
			}
			return true;
		}

		while (floor.getConsumption() > this.maxAllowedConsumption(floor)) {
			console.log(`event detected ${floor.getConsumption()}`);
			const subCorridor = floor
				.getSubCorridors()
				.find(subCorridor => !subCorridor.hasMovementDetected());
			subCorridor.turnOffElectricalEquipment(ELECTRICAL_EQUIPMENTS.AC);
		}

		return true;
	}

	maxAllowedConsumption(floor) {
		return (
			floor.getCorridors().length *
				(ELECTRICAL_EQUIPMENTS_POWER.LIGHT + ELECTRICAL_EQUIPMENTS_POWER.AC) +
			floor.getSubCorridors().length * ELECTRICAL_EQUIPMENTS_POWER.AC
		);
	}
}

module.exports = ElectricalEquipmentController;
