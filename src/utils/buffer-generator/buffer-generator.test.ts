import BufferCreator from "./buffer-generator";
describe("BufferGenerator", () => {
  let bufferCreator: BufferCreator<{}>;
  beforeEach(() => {
    bufferCreator = new BufferCreator();
  });

  describe("uint8", () => {
    test("It can process one number", () => {
      const buffer = bufferCreator.uint8("num").bufferFrom({ num: 12 });
      expect(buffer.byteLength).toBe(1);
      expect(buffer.readUInt8()).toBe(12);
    });

    test("It can process an object with many numbers", () => {
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

    test("It gives 0 for negative numbers", () => {
      const buffer = bufferCreator
        .uint8("num1")
        .uint8("num2")
        .uint8("num3")
        .uint8("num4")
        .bufferFrom({ num1: -100, num2: -1, num3: 22, num4: -10 });

      expect(buffer.length).toBe(4);
      expect(buffer.readUInt8()).toBe(0);
      expect(buffer.readUInt8(1)).toBe(0);
      expect(buffer.readUInt8(2)).toBe(22);
      expect(buffer.readUInt8(3)).toBe(0);
    });

    test("It gives 0 for numbers greater than 255", () => {
      const buffer = bufferCreator
        .uint8("num1")
        .uint8("num2")
        .uint8("num3")
        .uint8("num4")
        .bufferFrom({ num1: 256, num2: 5, num3: 300, num4: 255 });

      expect(buffer.length).toBe(4);
      expect(buffer.readUInt8()).toBe(0);
      expect(buffer.readUInt8(1)).toBe(5);
      expect(buffer.readUInt8(2)).toBe(0);
      expect(buffer.readUInt8(3)).toBe(255);
    });
  });
  describe("int8", () => {
    test("It can process one positive number", () => {
      const buffer = bufferCreator.int8("num").bufferFrom({ num: 12 });
      expect(buffer.byteLength).toBe(1);
      expect(buffer.readInt8()).toBe(12);
    });

    test("It can process one negative number", () => {
      const buffer = bufferCreator.int8("num").bufferFrom({ num: -12 });
      expect(buffer.byteLength).toBe(1);
      expect(buffer.readInt8()).toBe(-12);
    });

    test("It can process an object with many numbers", () => {
      const buffer = bufferCreator
        .int8("num1")
        .int8("num2")
        .int8("num3")
        .bufferFrom({ num1: 1, num2: -2, num3: 3 });
      expect(buffer.byteLength).toBe(3);
      expect(buffer.readInt8()).toBe(1);
      expect(buffer.readInt8(1)).toBe(-2);
      expect(buffer.readInt8(2)).toBe(3);
    });

    test("It gives 0 for numbers less than -128", () => {
      const buffer = bufferCreator
        .int8("num1")
        .int8("num2")
        .int8("num3")
        .int8("num4")
        .bufferFrom({ num1: -129, num2: -1, num3: 22, num4: -128 });

      expect(buffer.length).toBe(4);
      expect(buffer.readInt8()).toBe(0);
      expect(buffer.readInt8(1)).toBe(-1);
      expect(buffer.readInt8(2)).toBe(22);
      expect(buffer.readInt8(3)).toBe(-128);
    });

    test("It gives 0 for numbers greater than 127", () => {
      const buffer = bufferCreator
        .int8("num1")
        .int8("num2")
        .int8("num3")
        .int8("num4")
        .bufferFrom({ num1: 128, num2: 5, num3: 300, num4: 127 });

      expect(buffer.length).toBe(4);
      expect(buffer.readInt8()).toBe(0);
      expect(buffer.readInt8(1)).toBe(5);
      expect(buffer.readInt8(2)).toBe(0);
      expect(buffer.readInt8(3)).toBe(127);
    });
  });
});
