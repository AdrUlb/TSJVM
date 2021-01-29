import { AttributeInfo, CodeAttributeInfo } from "./AttributeInfo";
import BinaryReader from "./BinaryReader";
import { ConstantClassInfo, ConstantUtf8Info } from "./ConstantInfo";
import ConstantPool from "./ConstantPool";
import { GetAttributes, GetFields, GetInterfaces, GetMethods, NumberArraysEqual } from "./Util";

export class MethodInfo
{
	AccessFlags;
	Name;
	Descriptor;
	Attributes;

	constructor(br: BinaryReader, cp: ConstantPool)
	{
		this.AccessFlags = br.ReadUint16();
		this.Name = cp.GetItem<ConstantUtf8Info>(br.ReadUint16()).Text;
		this.Descriptor = cp.GetItem<ConstantUtf8Info>(br.ReadUint16()).Text;
		this.Attributes = GetAttributes(br, cp);
	}
}

export default class ClassFile
{
	public MajorVersion;
	public MinorVersion;
	public AccessFlags;
	public Name;
	public SuperName;
	public Interfaces;
	public Fields;
	public Methods;
	public Attributes;

	constructor(buffer: ArrayBuffer)
	{
		const magic = [ 0xCA, 0xFE, 0xBA, 0xBE ];

		const br = new BinaryReader(buffer);

		if (!NumberArraysEqual(magic, br.ReadBytes(magic.length)))
			throw "Magic constant not valid for class file.";

		this.MinorVersion = br.ReadUint16();
		this.MajorVersion = br.ReadUint16();

		const cp = new ConstantPool(br);
		console.log(cp);

		this.AccessFlags = br.ReadUint16();
		
		this.Name = cp.GetItem<ConstantUtf8Info>(cp.GetItem<ConstantClassInfo>(br.ReadUint16()).NameIndex).Text;
		this.SuperName = cp.GetItem<ConstantUtf8Info>(cp.GetItem<ConstantClassInfo>(br.ReadUint16()).NameIndex).Text;

		this.Interfaces = GetInterfaces(br);
		this.Fields = GetFields(br);
		this.Methods = GetMethods(br, cp);
		this.Attributes = GetAttributes(br, cp);
	}
}
