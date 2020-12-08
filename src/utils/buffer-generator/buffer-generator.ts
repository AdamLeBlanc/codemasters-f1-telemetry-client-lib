import { Parser } from "binary-parser";

interface DynamicObject {
  [k: string]: number;
}

interface StackItem {
  propertyName: string;
  operator: (buff: Buffer, value: number | string, offset: number) => number;
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
        if (typeof value == "number" && value >= 0 && value <= 255) {
          buff.writeUInt8(value, currentOffset);
        }
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
        if (typeof value == "number" && value >= -128 && value <= 127) {
          buff.writeInt8(value, currentOffset);
        }
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
        if (typeof value == "number" && value <= 2 ** 16 - 1 && value >= 0) {
          buff.writeUInt16LE(value, currentOffset);
        }
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
        if (typeof value == "number" && value >= -32768 && value <= 32767) {
          buff.writeInt16LE(value, currentOffset);
        }
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
        if (typeof value == "number") {
          buff.writeFloatLE(value, currentOffset);
        }
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
        if (typeof value == "number") {
          buff.writeBigInt64LE(BigInt(value), currentOffset);
        }
        return 8;
      },
    });
    this.sizeInBytes += 8;
    return this;
  }

  charArray<N extends string>(name: N, length: number): Next<T, N, number> {
    this.stack.push({
      operator: (buff, value, currentOffset) => {
        if (typeof value == "string") {
          buff.write(value, currentOffset, "ascii");
        }
        return length * 8;
      },
      propertyName: name,
    });
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
