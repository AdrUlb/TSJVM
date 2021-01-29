import BinaryReader from "./BinaryReader";
import { ConstantUtf8Info } from "./ConstantInfo";
import ConstantPool from "./ConstantPool";
import GenerateFunctionsFromBytecode, { GetAttributes } from "./Util";

export interface AttributeInfo {}

export class ExceptionTableEntry
{
	StartPC;
	EndPC;
	HandlerPC;
	//CatchType;

	constructor(br: BinaryReader)
	{
		this.StartPC = br.ReadUint16();
		this.EndPC = br.ReadUint16();
		this.HandlerPC = br.ReadUint16();

		const catchType = br.ReadUint16();
		if (catchType != 0)
			throw "Exceptions not implemented yet.";
		//this.CatchType = null;
	}
}

export class CodeAttributeInfo implements AttributeInfo
{
	MaxStack;
	MaxLocals;
	Code;
	ExceptionTable;
	LineNumberTable: Array<LineNumberTableEntry>|undefined;

	constructor(br: BinaryReader, cp: ConstantPool)
	{
		br.ReadUint32(); // CodeAttributeInfo is a fixed size structure, we have no use for this
		this.MaxStack = br.ReadUint16();
		this.MaxLocals = br.ReadUint16();
		this.Code = GenerateFunctionsFromBytecode(br.ReadBytes(br.ReadUint32()));
		this.ExceptionTable = new Array<ExceptionTableEntry>();
		const tableLength = br.ReadUint16();
		for (let i = 0; i < tableLength; i++)
			this.ExceptionTable.push(new ExceptionTableEntry(br));
		const attribs = GetAttributes(br, cp);
		attribs.forEach((attrib) =>
		{
			if (attrib instanceof LineNumberTableAttributeInfo)
				this.LineNumberTable = attrib.LineNumberTable;
			else
				throw `${this.constructor.name} can't handle attribute of type ${attrib.constructor.name}`;
		});
	}
}

export class LineNumberTableEntry
{
	StartPC;
	LineNumber;

	constructor(br: BinaryReader)
	{
		this.StartPC = br.ReadUint16();
		this.LineNumber = br.ReadUint16();
	}
}

export class LineNumberTableAttributeInfo implements AttributeInfo
{
	LineNumberTable;

	constructor(br: BinaryReader)
	{
		br.ReadUint32(); // CodeAttributeInfo is a fixed size structure, we have no use for this
		this.LineNumberTable = new Array<LineNumberTableEntry>();
		const tableLength = br.ReadUint16();
		for (let i = 0; i < tableLength; i++)
			this.LineNumberTable.push(new LineNumberTableEntry(br));
	}
}

export class SourceFileAttribute implements AttributeInfo
{
	SourceFile;

	constructor(br: BinaryReader, cp: ConstantPool)
	{
		br.ReadUint32(); // CodeAttributeInfo is a fixed size structure, we have no use for this
		this.SourceFile = cp.GetItem<ConstantUtf8Info>(br.ReadUint16()).Text;
	}
}
