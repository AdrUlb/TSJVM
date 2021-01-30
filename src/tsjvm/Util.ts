import { AttributeInfo, CodeAttributeInfo, LineNumberTableAttributeInfo, SourceFileAttribute } from "./AttributeInfo";
import BinaryReader from "./BinaryReader";
import { MethodInfo } from "./Class";
import { ConstantUtf8Info } from "./ConstantInfo";
import ConstantPool from "./ConstantPool";
import { InstructionLookupTable } from "./Instructions";

export function NumberArraysEqual(arr1: Array<number>, arr2: Array<number>)
{
	return JSON.stringify(arr1.toString()) === JSON.stringify(arr2.toString());
}

export function GetInterfaces(br: BinaryReader)
{
	const length = br.ReadUint16();

	if (length > 0)
		throw "Can't read interfaces yet.";
}

export function GetFields(br: BinaryReader)
{
	const count = br.ReadUint16();

	if (count > 0)
		throw "Can't read fields yet.";
}

export function GetMethods(br: BinaryReader, cp: ConstantPool)
{
	const methods = new Array<MethodInfo>();

	const count = br.ReadUint16();

	for (let i = 0; i < count; i++)
		methods.push(new MethodInfo(br, cp));

	return methods;
}

export function GetAttributes(br: BinaryReader, cp: ConstantPool)
{
	const attribs = new Array<AttributeInfo>();

	const funcs: { [key: string]: AttributeInfo } =
	{
		"Code": () => new CodeAttributeInfo(br, cp),
		"LineNumberTable": () => new LineNumberTableAttributeInfo(br),
		"SourceFile": () => new SourceFileAttribute(br, cp)
	};

	const count = br.ReadUint16();

	for (let i = 0; i < count; i++)
	{
		const name = cp.GetItem<ConstantUtf8Info>(br.ReadUint16()).Text
		const func: any = funcs[name];
		
		if (func === undefined)
		throw `Unknown attribute ${name}.`;
		
		attribs.push(func());
	}

	return attribs;
}

export default function BytecodeDecoder(bytecode: Array<number>)
{
	function UnknownOpcode(b: number)
	{
		throw `Can't handle bytecode instruction ${b}`;
	}

	const insts = new Array<Function>();

	bytecode.forEach((b) =>
	{
		let inst = InstructionLookupTable[b];
		if (inst === undefined)
			inst = () => UnknownOpcode(b);

		insts.push(inst);
	});

	return insts;
}
