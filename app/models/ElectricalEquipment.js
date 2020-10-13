class ElectricalEquipment {
	constructor(type, powerUnits, state) {
		this.type = type;
		this.powerUnits = powerUnits;
		this.state = state || false;
	}

	getPower() {
		return this.state ? this.powerUnits : 0;
	}

	getType() {
		return this.type;
  }
  
  getState() {
    return this.state;
  }

  switchOn() {
    this.state = true;
    console.log(`Electrical equipment of type ${this.type} is ${this.state} `);
    return this.state;
	}

	switchOff() {
		this.state = false;
		console.log(`Electrical equipment of type ${this.type} is ${this.state} `);
		return this.state;
	}
}

module.exports = ElectricalEquipment;
