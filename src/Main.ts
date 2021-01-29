import JVM from "./tsjvm/JVM";

function Main()
{
	const addClass: ArrayBuffer = require("./tests/00-add/Add.class");
	const jvm = new JVM();
	jvm.LoadClass(addClass);
}

window.onload = Main;
