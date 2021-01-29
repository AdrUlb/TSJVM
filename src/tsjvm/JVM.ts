import Class from "./Class";

export default class JVM
{
	classes = new Array<Class>();

	LoadClass(buffer: ArrayBuffer)
	{
		this.classes.push(new Class(buffer));
	}
}
