import { type } from "os";

class BufferCreator<T = {}> {
  uint8(name: string): BufferCreator<T & { name: number }> {
    return this;
  }

  int8(name: string): BufferCreator<T & { name: number }> {
    return this;
  }

  uint16(name: string): BufferCreator<T & { name: number }> {
    return this;
  }

  int16(name: string): BufferCreator<T & { name: number }> {
    return this;
  }

  float(name: string): BufferCreator<T & { name: number }> {
    return this;
  }

  uint64(name: string): BufferCreator<T & { name: number }> {
    return this;
  }

  bufferFrom(obj: T): Buffer {
    return Buffer.alloc(10);
  }
}
