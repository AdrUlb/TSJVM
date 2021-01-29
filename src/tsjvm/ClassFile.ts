import BinaryReader from "./BinaryReader";
import ConstantPool, { ConstantClassInfo, ConstantUtf8Info } from "./ConstantPool";
import { NumberArraysEqual } from "./Util";

export default class ClassFile
{
	public MajorVersion;
	public MinorVersion;
	public AccessFlags;
	public Name;
	public SuperName;

	constructor(buffer: ArrayBuffer)
	{
		const magic = [ 0xCA, 0xFE, 0xBA, 0xBE ];

		const br = new BinaryReader(buffer);

		if (!NumberArraysEqual(magic, br.ReadBytes(magic.length)))
		{
			console.error("Magic constant not valid for class file.");
			return;
		}

		this.MinorVersion = br.ReadUint16();
		this.MajorVersion = br.ReadUint16();

		const cp = new ConstantPool(br);

		this.AccessFlags = br.ReadUint16();
		
		this.Name = cp.GetItem<ConstantUtf8Info>(cp.GetItem<ConstantClassInfo>(br.ReadUint16()).NameIndex).Text;
		this.SuperName = cp.GetItem<ConstantUtf8Info>(cp.GetItem<ConstantClassInfo>(br.ReadUint16()).NameIndex).Text;
	}
}
