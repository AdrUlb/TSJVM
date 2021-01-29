import { AttributeInfo, CodeAttributeInfo, SourceFileAttribute } from "./AttributeInfo";
import BinaryReader from "./BinaryReader";
import { ConstantClassInfo, ConstantUtf8Info } from "./ConstantInfo";
import ConstantPool from "./ConstantPool";
import { GetAttributes, GetFields, GetInterfaces, GetMethods, NumberArraysEqual } from "./Util";

export class MethodInfo
{
	AccessFlags;
	Name;
	Descriptor;
	CodeInfo: CodeAttributeInfo|undefined;

	constructor(br: BinaryReader, cp: ConstantPool)
	{
		this.AccessFlags = br.ReadUint16();
		this.Name = cp.GetItem<ConstantUtf8Info>(br.ReadUint16()).Text;
		this.Descriptor = cp.GetItem<ConstantUtf8Info>(br.ReadUint16()).Text;
		const attribs = GetAttributes(br, cp);
		attribs.forEach((attrib) =>
		{
			if (attrib instanceof CodeAttributeInfo)
				this.CodeInfo = attrib;
			else
				throw `${this.constructor.name} can't handle attribute of type ${attrib.constructor.name}`;
		});
	}
}

export default class Class
{
	public MajorVersion;
	public MinorVersion;
	public AccessFlags;
	public Name;
	public SuperName;
	public SourceFile: string|undefined;
	public Interfaces;
	public Fields;
	public Methods;

	constructor(buffer: ArrayBuffer)
	{
		const magic = [ 0xCA, 0xFE, 0xBA, 0xBE ];

		const br = new BinaryReader(buffer);

		if (!NumberArraysEqual(magic, br.ReadBytes(magic.length)))
			throw "Magic constant not valid for class file.";

		this.MinorVersion = br.ReadUint16();
		this.MajorVersion = br.ReadUint16();

		const cp = new ConstantPool(br);

		this.AccessFlags = br.ReadUint16();
		
		this.Name = cp.GetItem<ConstantUtf8Info>(cp.GetItem<ConstantClassInfo>(br.ReadUint16()).NameIndex).Text;
		this.SuperName = cp.GetItem<ConstantUtf8Info>(cp.GetItem<ConstantClassInfo>(br.ReadUint16()).NameIndex).Text;

		this.Interfaces = GetInterfaces(br);
		this.Fields = GetFields(br);
		this.Methods = GetMethods(br, cp);
		const attribs = GetAttributes(br, cp);
		attribs.forEach((attrib) =>
		{
			if (attrib instanceof SourceFileAttribute)
				this.SourceFile = attrib.SourceFile;
			else
				throw `${this.constructor.name} can't handle attribute of type ${attrib.constructor.name}`;
		});
	}
}
