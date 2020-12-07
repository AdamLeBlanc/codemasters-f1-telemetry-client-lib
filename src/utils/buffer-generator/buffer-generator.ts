import { Parser } from "binary-parser";

interface DynamicObject {
  [k: string]: number;
}

interface StackItem {
  propertyName: string;
  operator: (buff: Buffer, value: number, offset: number) => number;
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
    this.stack.push({
      propertyName: name,
      operator: (buff, value, currentOffset) => {
        buff.writeUInt8(value, currentOffset);
        return 1;
      },
    });
    this.sizeInBytes += 1;
    return this;
  }

  int8<N extends string>(name: N): Next<T, N, number> {
    this.stack.push({
      propertyName: name,
      operator: (buff, value, currentOffset) => {
        buff.writeInt8(value, currentOffset);
        return 1;
      },
    });
    this.sizeInBytes += 1;
    return this;
  }

  uint16<N extends string>(name: N): Next<T, N, number> {
    this.stack.push({
      propertyName: name,
      operator: (buff, value, currentOffset) => {
        buff.writeUInt16LE(value, currentOffset);
        return 2;
      },
    });
    this.sizeInBytes += 2;
    return this;
  }

  int16<N extends string>(name: N): Next<T, N, number> {
    this.stack.push({
      propertyName: name,
      operator: (buff, value, currentOffset) => {
        buff.writeUInt16LE(value, currentOffset);
        return 2;
      },
    });
    this.sizeInBytes += 2;
    return this;
  }

  float<N extends string>(name: N): Next<T, N, number> {
    this.stack.push({
      propertyName: name,
      operator: (buff, value, currentOffset) => {
        buff.writeFloatLE(value, currentOffset);
        return 4;
      },
    });
    this.sizeInBytes += 4;
    return this;
  }

  uint64<N extends string>(name: N): Next<T, N, number> {
    this.stack.push({
      propertyName: name,
      operator: (buff, value, currentOffset) => {
        buff.writeBigInt64LE(BigInt(value), currentOffset);
        return 8;
      },
    });
    this.sizeInBytes += 8;
    return this;
  }

  bufferFrom(obj: T): Buffer {
    const buff = Buffer.alloc(this.sizeInBytes);
    let offset = 0;
    for (let i = 0; i < this.stack.length; i++) {
      const { operator, propertyName } = this.stack[i];
      offset += operator(buff, obj[propertyName], offset);
    }
    return buff;
  }
}
