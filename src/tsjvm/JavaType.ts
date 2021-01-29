interface JavaType
{
	readonly DefaultValue: any;

	Value: any;
}

interface JavaNumericType extends JavaType
{
	readonly MinValue: any;
	readonly MaxValue: any;
	readonly DefaultValue: any;

	Value: any;
}

interface JavaIntegralType extends JavaNumericType
{
	readonly MinValue: BigInt;
	readonly MaxValue: BigInt;
	readonly DefaultValue: BigInt;

	Value: BigInt;
}

export class JavaByte implements JavaIntegralType
{
	readonly MinValue = -128n;
	readonly MaxValue = 127n;
	readonly DefaultValue = 0n;

	private value = this.DefaultValue;

	get Value()
	{
		return this.value;
	}

	set Value(value)
	{
		if (value > this.MaxValue)
		{
			const over = this.MaxValue - value + 1n;
			value = this.MinValue - over;
		}
		else if (value < this.MinValue)
		{
			const under = this.MinValue - value - 1n;
			value = this.MaxValue - under;
		}
		this.value = value;
	}
}

export class JavaShort implements JavaIntegralType
{
	MinValue = -32768n;
	MaxValue = 32767n;
	DefaultValue = 0n;

	private value = this.DefaultValue;

	get Value()
	{
		return this.value;
	}

	set Value(value)
	{
		if (value > this.MaxValue)
		{
			const over = this.MaxValue - value + 1n;
			value = this.MinValue - over;
		}
		else if (value < this.MinValue)
		{
			const under = this.MinValue - value - 1n;
			value = this.MaxValue - under;
		}
		this.value = value;
	}
}

export class JavaInt implements JavaIntegralType
{
	MinValue = -2147483648n;
	MaxValue = 2147483647n;
	DefaultValue = 0n;

	private value = this.DefaultValue;

	get Value()
	{
		return this.value;
	}

	set Value(value)
	{
		if (value > this.MaxValue)
		{
			const over = this.MaxValue - value + 1n;
			value = this.MinValue - over;
		}
		else if (value < this.MinValue)
		{
			const under = this.MinValue - value - 1n;
			value = this.MaxValue - under;
		}
		this.value = value;
	}
}

export class JavaLong implements JavaIntegralType
{
	MinValue = -9223372036854775808n;
	MaxValue = 9223372036854775807n;
	DefaultValue = 0n;

	private value = this.DefaultValue;

	get Value()
	{
		return this.value;
	}

	set Value(value)
	{
		if (value > this.MaxValue)
		{
			const over = this.MaxValue - value + 1n;
			value = this.MinValue - over;
		}
		else if (value < this.MinValue)
		{
			const under = this.MinValue - value - 1n;
			value = this.MaxValue - under;
		}
		this.value = value;
	}
}
