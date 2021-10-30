import { EventEmitter } from "stream";

export class EventsSingleton {
  static event: EventEmitter = null;
  constructor() {
    throw new Error("Cannot be Instantiated.");
  }

  static getInstance(): EventEmitter {
    if (!this.event) this.event = new EventEmitter();
    return this.event;
  }
}
