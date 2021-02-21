export const withValueAtIndex = <T>(array: T[], value: T, index: number) =>
{
	const temp = array.slice()
	temp[index] = value
	return temp
}
