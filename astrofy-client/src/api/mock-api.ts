import { ItemType, ItemOutputSchema } from '../types/types';

export const getCategories = () => {
	return [
		ItemType.LAPTOP,
		ItemType.TABLET,
		ItemType.PERIPHERAL,
		ItemType.SMARTPHONE
	];
};

export const mockGetItems: ItemOutputSchema[] = [
	{
		id: 1,
		manufacturer: 'Xiaomi',
		model: 'Mi Notebook Pro',
		category: ItemType.LAPTOP,
		description:
			'Xiaomi Mi Notebook Pro 15 (2020) is a Windows 10 Home laptop with a 15.60-inch display that has a resolution of 1920x1080 pixels. It is powered by a Core i5 processor and it comes with 8GB of RAM. The Xiaomi Mi Notebook Pro 15 (2020) packs 512GB of SSD storage. Graphics are powered by Nvidia GeForce MX350.',
		quantity: 12,
		CPU: 'Intel Core i5 8250U',
		GPU: 'Nvidia GeForce MX150',
		RAM: 8,
		diagonal: 15.6,
		driveCapacity: 256,
		batteryCapacity: 8000,
		cost: 2000
	} as ItemOutputSchema,
	{
		id: 2,
		manufacturer: 'Xiaomi',
		model: 'Mi Notebook Pro',
		category: ItemType.LAPTOP,
		description:
			'Xiaomi Mi Notebook Pro 15 (2020) is a Windows 10 Home laptop with a 15.60-inch display that has a resolution of 1920x1080 pixels. It is powered by a Core i5 processor and it comes with 8GB of RAM. The Xiaomi Mi Notebook Pro 15 (2020) packs 512GB of SSD storage. Graphics are powered by Nvidia GeForce MX350.',
		quantity: 12,
		CPU: 'Intel Core i5 8250U',
		GPU: 'Nvidia GeForce MX150',
		RAM: 8,
		diagonal: 15.6,
		driveCapacity: 256,
		batteryCapacity: 8000,
		cost: 2000
	} as ItemOutputSchema,
	{
		id: 3,
		manufacturer: 'Xiaomi',
		model: 'Mi Notebook Pro',
		category: ItemType.LAPTOP,
		description:
			'Xiaomi Mi Notebook Pro 15 (2020) is a Windows 10 Home laptop with a 15.60-inch display that has a resolution of 1920x1080 pixels. It is powered by a Core i5 processor and it comes with 8GB of RAM. The Xiaomi Mi Notebook Pro 15 (2020) packs 512GB of SSD storage. Graphics are powered by Nvidia GeForce MX350.',
		quantity: 12,
		CPU: 'Intel Core i5 8250U',
		GPU: 'Nvidia GeForce MX150',
		RAM: 8,
		diagonal: 15.6,
		driveCapacity: 256,
		batteryCapacity: 8000,
		cost: 2000
	} as ItemOutputSchema,
	{
		id: 4,
		manufacturer: 'Xiaomi',
		model: 'Mi Notebook Pro',
		category: ItemType.LAPTOP,
		description:
			'Xiaomi Mi Notebook Pro 15 (2020) is a Windows 10 Home laptop with a 15.60-inch display that has a resolution of 1920x1080 pixels. It is powered by a Core i5 processor and it comes with 8GB of RAM. The Xiaomi Mi Notebook Pro 15 (2020) packs 512GB of SSD storage. Graphics are powered by Nvidia GeForce MX350.',
		quantity: 12,
		CPU: 'Intel Core i5 8250U',
		GPU: 'Nvidia GeForce MX150',
		RAM: 8,
		diagonal: 15.6,
		driveCapacity: 256,
		batteryCapacity: 8000,
		cost: 2000
	} as ItemOutputSchema,
	{
		id: 5,
		manufacturer: 'Xiaomi',
		model: 'Mi Notebook Pro',
		category: ItemType.LAPTOP,
		description:
			'Xiaomi Mi Notebook Pro 15 (2020) is a Windows 10 Home laptop with a 15.60-inch display that has a resolution of 1920x1080 pixels. It is powered by a Core i5 processor and it comes with 8GB of RAM. The Xiaomi Mi Notebook Pro 15 (2020) packs 512GB of SSD storage. Graphics are powered by Nvidia GeForce MX350.',
		quantity: 12,
		CPU: 'Intel Core i5 8250U',
		GPU: 'Nvidia GeForce MX150',
		RAM: 8,
		diagonal: 15.6,
		driveCapacity: 256,
		batteryCapacity: 8000,
		cost: 2000
	} as ItemOutputSchema
];

export const mockUser = {
	name: '孤独な 宇宙飛行士',
	email: 'thelonelyastronaut1337@gmail.com',
	dateOfBirth: '25/05/2001',
	address: 'Minsk, Mayakovskogo 140, 73'
};
