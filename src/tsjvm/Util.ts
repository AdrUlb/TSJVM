export function NumberArraysEqual(arr1: Array<number>, arr2: Array<number>)
{
	return JSON.stringify(arr1.toString()) === JSON.stringify(arr2.toString());
}
