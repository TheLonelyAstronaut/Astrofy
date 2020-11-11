/*
	Auth definitions
*/

export type LoginInputSchema = {
	username: string;
	password: string;
};

export type RegisterInputSchema = LoginInputSchema & {
	email: string;
	address: string;
	birthDate: string;
};

export interface UserSchema {
	id: number;
	username: string;
	email: string;
	address: string;
	birthDate: string;
	basket: ItemOutputSchema[];
	payments: Payment[];
	isAdmin: boolean;
};

export interface TokenSchema {
	id: number;
	token: string;
	userID: number;
	isActive: boolean;
};

export interface Upload {
	filename: string,
	mimetype: string,
	encoding: string,
	createReadStream: () => any;
}

export interface ImageSchema {
	id: number;
	url: string;
	itemID: number | undefined;
}

export interface AuthSchema {
	user: UserSchema;
	token: string;
};

/*
	Item definitions
*/

export type Item = {
	id: number | undefined;
	manufacturer: string;
	model: string;
	category: ItemType;
	description: string;
	quantity: number;
	cost: number;
};

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
};

export type ItemOutputSchema = ItemInputSchema & {
	id: number;
};

export type RemoveFromDatabaseSchema = {
	itemID: number;
	delta: number;
}

export type GetItemsSchema = {
	itemID: number;
}

export type GetAllItemsSchema = {
	category: string;
	pageNumber: number;
}

export type Laptop =  Item & {
	CPU: string;
	GPU: string;
	RAM: number;
	diagonal: number;
	driveCapacity: number;
	batteryCapacity: number;
};

export type Smartphone = Item & {
	SoC: string;
	RAM: number;
	diagonal: number;
	driveCapacity: number;
	batteryCapacity: number;
};

export type Tablet = Smartphone;

export type Peripheral = Item & {
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
