interface DynamicObject {
  [k: string]: number;
}

interface StackItem {
  propertyName: string;
  operator: (buff: Buffer, value: number) => void;
}

type Next<
  O extends DynamicObject,
  N extends string,
  T extends number
> = BufferCreator<O & { [name in N]: T }>;

export default class BufferCreator<T extends DynamicObject> {
  private stack: StackItem[] = [];
  private sizeInBytes = 0;
  uint8<N extends string>(name: N): Next<T, N, number> {
    const currentOffset = this.sizeInBytes;
    this.stack.push({
      propertyName: name,
      operator: (buff, value) => buff.writeUIntLE(value, currentOffset, 1),
    });
    this.sizeInBytes += 1;
    return this;
  }

  int8<N extends string>(name: N): Next<T, N, number> {
    this.sizeInBytes += 1;
    return this;
  }

  uint16<N extends string>(name: string): Next<T, N, number> {
    this.sizeInBytes += 2;
    return this;
  }

  int16<N extends string>(name: string): Next<T, N, number> {
    this.sizeInBytes += 2;
    return this;
  }

  float<N extends string>(name: string): Next<T, N, number> {
    this.sizeInBytes += 4;
    return this;
  }

  uint64<N extends string>(name: string): Next<T, N, number> {
    this.sizeInBytes != 8;
    return this;
  }

  bufferFrom(obj: T): Buffer {
    const buff = Buffer.alloc(this.sizeInBytes);
    for (let i = 0; i < this.stack.length; i++) {
      const { operator, propertyName } = this.stack[i];
      operator(buff, obj[propertyName]);
    }
    return buff;
  }
}
