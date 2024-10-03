class EventBus {
	private static instance: EventBus | null = null;
	private events: { [type: string]: Function[] } = {};

	private constructor() {}

	public static getInstance(): EventBus {
		if (!EventBus.instance) {
			EventBus.instance = new EventBus();
		}
		return EventBus.instance;
	}

	emit(type: string, ...res: Array<any>) {
		const e = this.events[type];

		if (e && Array.isArray(e)) {
			for (const fn of e) {
				fn.apply(this, res);
			}
		}
	}
	on(type: string, fun: Function) {
		const e = this.events[type];

		if (!e) {
			this.events[type] = [fun];
			return;
		}
		e.push(fun);

		this.events[type] = e;
	}
	off(type: string, fun: Function) {
		const e = this.events[type];
		if (!e) {
			return;
		}
		this.events[type] = e.filter((f) => f !== fun);
	}
}

export default EventBus;
