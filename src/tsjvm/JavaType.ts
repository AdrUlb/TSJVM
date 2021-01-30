abstract class JavaType
{
	readonly DefaultValue: any;
	
	Value: any;
}

abstract class JavaNumericType extends JavaType
{
	readonly MinValue: any;
	readonly MaxValue: any;
	readonly DefaultValue: any;

	Value: any;
}

abstract class JavaIntegralType implements JavaNumericType
{
	readonly MinValue: bigint = 0n;
	readonly MaxValue: bigint = 0n;
	readonly DefaultValue: bigint = 0n;

	private value: bigint = this.DefaultValue;

	get Value()
	{
		return this.value + this.MinValue;
	}

	set Value(value)
	{
		value -= this.MinValue;
		const unsignedMax = this.MaxValue - this.MinValue;
		value &= unsignedMax;

		this.value = value;
	}
}

export class JavaByte extends JavaIntegralType
{
	readonly MinValue = -128n;
	readonly MaxValue = 127n;
}

export class JavaShort extends JavaIntegralType
{
	readonly MinValue = -32768n;
	readonly MaxValue = 32767n;
}

export class JavaInt extends JavaIntegralType
{
	readonly MinValue = -2147483648n;
	readonly MaxValue = 2147483647n;
}

export class JavaLong extends JavaIntegralType
{
	readonly MinValue = -9223372036854775808n;
	readonly MaxValue = 9223372036854775807n;
}

export class JavaChar extends JavaIntegralType
{
	readonly MinValue = 0n;
	readonly MaxValue = 65535n;
}
