import Frame from "./tsjvm/Frame";
import { JavaByte } from "./tsjvm/JavaType";
import JVM from "./tsjvm/JVM";

function Main()
{
	const x = new JavaByte();
	x.Value = -128n-1n;
	console.log(x.Value);

	const addClassFile = require("./tests/00-add/Add.class");
	const jvm = new JVM();
	jvm.LoadClassFile(addClassFile);
	
	const addClass = jvm.GetClass("Add");
	if (addClass == null)
		throw "Couldn't get Add class";

	const addMethod = addClass.GetMethod("add");
	if (addMethod == null)
		throw "Couldn't get Add class";

	const frame = new Frame(addMethod);
}

window.onload = Main;
