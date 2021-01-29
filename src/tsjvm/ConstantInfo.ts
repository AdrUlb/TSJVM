import BinaryReader from "./BinaryReader";

export interface ConstantInfo {}

export class ConstantUtf8Info implements ConstantInfo
{
	Text;

	constructor(br: BinaryReader)
	{
		this.Text = <string>String.fromCharCode.apply(null, br.ReadBytes(br.ReadUint16()));
	}
}

export class ConstantClassInfo implements ConstantInfo
{
	NameIndex;
	
	constructor(br: BinaryReader)
	{
		this.NameIndex = br.ReadUint16();
	}
}

export class ConstantMethodrefInfo implements ConstantInfo
{
	ClassIndex;
	NameAndTypeIndex;

	constructor(br: BinaryReader)
	{
		this.ClassIndex = br.ReadUint16();
		this.NameAndTypeIndex = br.ReadUint16();
	}
}

export class ConstantNameAndTypeInfo implements ConstantInfo
{
	NameIndex;
	DescriptorIndex;

	constructor(br: BinaryReader)
	{
		this.NameIndex = br.ReadUint16();
		this.DescriptorIndex = br.ReadUint16();
	}
}
