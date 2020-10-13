const Listener = require("./Listener");

class EventListener extends Listener {
	constructor(controller) {
    super(controller);
  }

  setController(controller) {
    this.controller = controller;
  }

  eventOccured(floor) {
    this.controller.computeConsumption(floor);
  }
}

module.exports = EventListener;
