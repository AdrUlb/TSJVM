import BinaryReader from "./BinaryReader";

interface ConstantInfo {}

export class ConstantUtf8Info implements ConstantInfo
{
	Text;

	constructor(text: string)
	{
		this.Text = text;
	}
}

export class ConstantClassInfo implements ConstantInfo
{
	NameIndex;

	constructor(nameIndex: number)
	{
		this.NameIndex = nameIndex;
	}
}

export class ConstantMethodrefInfo implements ConstantInfo
{
	ClassIndex;
	NameAndTypeIndex;

	constructor(classIndex: number, nameAndTypeIndex: number)
	{
		this.ClassIndex = classIndex;
		this.NameAndTypeIndex = nameAndTypeIndex;
	}
}

export class ConstantNameAndTypeInfo implements ConstantInfo
{
	NameIndex;
	DescriptorIndex;

	constructor(nameIndex: number, descriptorIndex: number)
	{
		this.NameIndex = nameIndex;
		this.DescriptorIndex = descriptorIndex;
	}
}

export default class ConstantPool
{
	private entries = new Array<ConstantInfo>();

	constructor(br: BinaryReader)
	{
		const funcs: { [key: number]: Function }  =
		{
			1: () => this.entries.push(new ConstantUtf8Info(String.fromCharCode.apply(null, br.ReadBytes(br.ReadUint16())))),
			7: () => this.entries.push(new ConstantClassInfo(br.ReadUint16())),
			10: () => this.entries.push(new ConstantMethodrefInfo(br.ReadUint16(), br.ReadUint16())),
			12: () => this.entries.push(new ConstantNameAndTypeInfo(br.ReadUint16(), br.ReadUint16()))
		}

		Object.freeze(funcs);
		
		const length = br.ReadUint16() - 1;

		for (let i = 0; i < length; i++)
		{
			const tag = br.ReadUint8();
			const func: any = funcs[tag];

			if (func === undefined)
			{
				console.error(`Unknown tag ${tag} in constant pool.`);
				return;
			}
			
			func();
		}
	}

	GetItem<T>(index: number): T
	{
		return <T>this.entries[index - 1];
	}
}
