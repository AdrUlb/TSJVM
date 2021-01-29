import BinaryReader from "./BinaryReader";
import { ConstantClassInfo, ConstantInfo, ConstantMethodrefInfo, ConstantNameAndTypeInfo, ConstantUtf8Info } from "./ConstantInfo";

export default class ConstantPool
{
	private entries = new Array<ConstantInfo>();

	constructor(br: BinaryReader)
	{
		const funcs: { [key: number]: ConstantInfo } =
		{
			1: () => new ConstantUtf8Info(br),
			7: () => new ConstantClassInfo(br),
			10: () => new ConstantMethodrefInfo(br),
			12: () => new ConstantNameAndTypeInfo(br)
		};

		Object.freeze(funcs);
		
		const count = br.ReadUint16() - 1;

		for (let i = 0; i < count; i++)
		{
			const tag = br.ReadUint8();
			const func: any = funcs[tag];

			if (func === undefined)
				throw `Unknown tag ${tag} in constant pool.`;
			
			this.entries.push(func());
		}
	}

	GetItem<T>(index: number): T
	{
		return <T>this.entries[index - 1];
	}
}
