export default class BinaryReader
{
	private view;
	private offset = 0;

	ReadUint8()
	{
		const ret = this.view.getUint8(this.offset);
		this.offset++;
		return ret;
	}

	ReadUint16()
	{
		const ret = this.view.getUint16(this.offset);
		this.offset += 2;
		return ret;
	}

	ReadUint32()
	{
		const ret = this.view.getUint32(this.offset);
		this.offset += 4;
		return ret;
	}

	ReadBytes(count: number)
	{
		const arr = [];

		for (let i = 0; i < count; i++)
		{
			arr.push(this.ReadUint8());
		}

		return arr;
	}

	constructor(buffer: ArrayBuffer)
	{
		this.view = new DataView(buffer);
	}
}
