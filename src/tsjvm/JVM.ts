import Class from "./Class";

export default class JVM
{
	classes = new Array<Class>();

	LoadClassFile(buffer: ArrayBuffer)
	{
		this.classes.push(new Class(buffer));
	}

	GetClass(name: string): Class|null
	{
		let c: Class|null = null;
		this.classes.forEach((currentC) =>
		{
			if (currentC.Name == name)
			{
				c = currentC;
				return;
			}
		});
		return c;
	}
}
