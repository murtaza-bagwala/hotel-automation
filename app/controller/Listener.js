class Listener {
	constructor(controller) {
		if (!this.eventOccured) {
			throw new Error(
				"Listener should implement eventOccured method"
			);
    }
    this.controller = controller;
	}
}

module.exports = Listener;
