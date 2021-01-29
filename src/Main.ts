import JVM from "./tsjvm/JVM";

function Main()
{
	const addClass = require("./tests/00-add/Add.class");
	const jvm = new JVM();
	jvm.LoadClass(addClass);
	console.log(jvm);
}

window.onload = Main;
