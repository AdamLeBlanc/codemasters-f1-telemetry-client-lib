import BufferCreator from "./buffer-generator";
describe("BufferGenerator", () => {
  let bufferCreator: BufferCreator<{}>;
  beforeEach(() => {
    bufferCreator = new BufferCreator();
  });

  test("It can process an object with a single uint8", () => {
    const buffer = bufferCreator.uint8("num").bufferFrom({ num: 12 });
    expect(buffer.byteLength).toBe(1);
    expect(buffer.readUInt8()).toBe(12);
  });

  test("It can process an object with a multiple uint8", () => {
    const buffer = bufferCreator
      .uint8("num1")
      .uint8("num2")
      .uint8("num3")
      .bufferFrom({ num1: 1, num2: 2, num3: 3 });
    expect(buffer.byteLength).toBe(3);
    expect(buffer.readUInt8()).toBe(1);
    expect(buffer.readUInt8(1)).toBe(2);
    expect(buffer.readUInt8(2)).toBe(3);
  });

  test("It gives 0 for negative numbers on UInt8", () => {
    const buffer = bufferCreator
      .uint8("num1")
      .uint8("num2")
      .uint8("num3")
      .uint8("num4")
      .bufferFrom({ num1: -100, num2: -1, num3: 22, num4: -10 });

    expect(buffer.readUInt8()).toBe(0);
    expect(buffer.readUInt8(1)).toBe(0);
    expect(buffer.readUInt8(2)).toBe(22);
    expect(buffer.readUInt8(3)).toBe(0);
  });

  test("It gives 0 for numbers greater than 255 on UInt8", () => {
    const buffer = bufferCreator
      .uint8("num1")
      .uint8("num2")
      .uint8("num3")
      .uint8("num4")
      .bufferFrom({ num1: 256, num2: 5, num3: 300, num4: 255 });

    expect(buffer.readUInt8()).toBe(0);
    expect(buffer.readUInt8(1)).toBe(5);
    expect(buffer.readUInt8(2)).toBe(0);
    expect(buffer.readUInt8(3)).toBe(255);
  });
});
