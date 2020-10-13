class Controller {
	constructor() {
		if (!this.maxAllowedConsumption) {
			throw new Error(
				"Controller should implement maxAllowedConstumption method"
			);
		}

		if (!this.computeConsumption) {
			throw new Error("Controller should implement computeConsumption method");
		}
	}
}

module.exports = Controller;
