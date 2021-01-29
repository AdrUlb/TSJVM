import ClassFile from "./ClassFile";

export default class JVM
{
	LoadClass(buffer: ArrayBuffer)
	{
		console.log(new ClassFile(buffer));
	}
}
