/*
	Auth definitions
*/
export interface User {
	id: number;
	username: string;
	email: string;
	address: string | undefined;
	birthDate: string | undefined;
	basket: ItemOutputSchema[] | undefined;
	payments: Payment[] | undefined;
	isAdmin: boolean;
}

/*
	Item definitions
*/

export type Photo = {
	id: number;
	url: string;
	itemID?: number;
};

export type Item = {
	id: number | undefined;
	manufacturer: string;
	model: string;
	category: ItemType;
	description: string;
	quantity: number;
	cost: number;
};

export type ItemWithPhotos = Item & {
	photos: Photo[]
}

export enum ItemType {
	LAPTOP = 'LAPTOP',
	SMARTPHONE = 'SMARTPHONE',
	TABLET = 'TABLET',
	PERIPHERAL = 'PERIPHERAL'
}

export type ItemInputSchema = Item & {
	CPU: string | undefined;
	GPU: string | undefined;
	RAM: number | undefined;
	diagonal: number | undefined;
	driveCapacity: number | undefined;
	batteryCapacity: number | undefined;
	SoC: string | undefined;
	additionalInfo: string | undefined;
	photos: number[]
};

export type ItemOutputSchema = ItemInputSchema & {
	id: number;
	photos: Photo[]
};

export type Laptop =  ItemWithPhotos & {
	CPU: string;
	GPU: string;
	RAM: number;
	diagonal: number;
	driveCapacity: number;
	batteryCapacity: number;
};

export type Smartphone = ItemWithPhotos & {
	SoC: string;
	RAM: number;
	diagonal: number;
	driveCapacity: number;
	batteryCapacity: number;
};

export type Tablet = Smartphone;

export type Peripheral = ItemWithPhotos & {
	additionalInfo: string;
};

/*
	Basket&Payment types
*/

export type Basket = {
	items: number[];
	isActual: boolean;
	id: number;
	userID: number;
}

export type BasketOutput = {
	items: ItemOutputSchema[]
}

export type Payment = {
	paymentID: number,
	items: ItemOutputSchema[],
	createdAt: string
}
