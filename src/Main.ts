import JVM from "./tsjvm/JVM";

function Main()
{
	const addClassFile = require("./tests/00-add/Add.class");
	const jvm = new JVM();
	jvm.LoadClassFile(addClassFile);
	
	const c = jvm.GetClass("Add");
	if (c == null)
		throw "Couldn't get Add class";

	const m = c.GetMethod("add");
	if (m == null)
		throw "Couldn't get Add class";
}

window.onload = Main;
