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
  describe("unt16", () => {
    test("It can process one positive number", () => {
      const buffer = bufferCreator.uint16("num").bufferFrom({ num: 600 });
      expect(buffer.byteLength).toBe(2);
      expect(buffer.readUInt16LE()).toBe(600);
    });

    test("It sets 0 on negative", () => {
      const buffer = bufferCreator.uint16("num").bufferFrom({ num: -12 });
      expect(buffer.byteLength).toBe(2);
      expect(buffer.readUInt16LE()).toBe(0);
    });

    test("It can process an object with many numbers", () => {
      const buffer = bufferCreator
        .uint16("num1")
        .uint16("num2")
        .uint16("num3")
        .bufferFrom({ num1: 44, num2: -2, num3: 6784 });
      expect(buffer.byteLength).toBe(6);
      expect(buffer.readUInt16LE()).toBe(44);
      expect(buffer.readUInt16LE(2)).toBe(0);
      expect(buffer.readUInt16LE(4)).toBe(6784);
    });

    test("It gives 0 for numbers less than 0", () => {
      const buffer = bufferCreator
        .uint16("num1")
        .uint16("num2")
        .uint16("num3")
        .uint16("num4")
        .bufferFrom({ num1: -129, num2: -1, num3: 22, num4: -128 });

      expect(buffer.length).toBe(8);
      expect(buffer.readUInt16LE()).toBe(0);
      expect(buffer.readUInt16LE(2)).toBe(0);
      expect(buffer.readUInt16LE(4)).toBe(22);
      expect(buffer.readUInt16LE(6)).toBe(0);
    });

    test("It gives 0 for numbers greater than 2^16-1", () => {
      const buffer = bufferCreator
        .uint16("num1")
        .uint16("num2")
        .uint16("num3")
        .uint16("num4")
        .bufferFrom({ num1: 2 ** 16 - 1, num2: 5, num3: 2 ** 16, num4: 15 });

      expect(buffer.length).toBe(8);
      expect(buffer.readUInt16LE()).toBe(2 ** 16 - 1);
      expect(buffer.readUInt16LE(2)).toBe(5);
      expect(buffer.readUInt16LE(4)).toBe(0);
      expect(buffer.readUInt16LE(6)).toBe(15);
    });
  });
  describe("int16", () => {
    test("It can process one positive number", () => {
      const buffer = bufferCreator.int16("num").bufferFrom({ num: 898 });
      expect(buffer.byteLength).toBe(2);
      expect(buffer.readInt16LE()).toBe(898);
    });

    test("It can process one negative number", () => {
      const buffer = bufferCreator.int16("num").bufferFrom({ num: -1277 });
      expect(buffer.byteLength).toBe(2);
      expect(buffer.readInt16LE()).toBe(-1277);
    });

    test("It can process an object with many numbers", () => {
      const buffer = bufferCreator
        .int16("num1")
        .int16("num2")
        .int16("num3")
        .bufferFrom({ num1: 989, num2: -23, num3: 331 });
      expect(buffer.byteLength).toBe(6);
      expect(buffer.readInt16LE()).toBe(989);
      expect(buffer.readInt16LE(2)).toBe(-23);
      expect(buffer.readInt16LE(4)).toBe(331);
    });

    test("It gives 0 for numbers less than -32768", () => {
      const buffer = bufferCreator
        .int16("num1")
        .int16("num2")
        .int16("num3")
        .int16("num4")
        .bufferFrom({ num1: -32768, num2: -32769, num3: -123123, num4: -8 });

      expect(buffer.length).toBe(8);
      expect(buffer.readInt16LE()).toBe(-32768);
      expect(buffer.readInt16LE(2)).toBe(0);
      expect(buffer.readInt16LE(4)).toBe(0);
      expect(buffer.readInt16LE(6)).toBe(-8);
    });

    test("It gives 0 for numbers greater than 32767", () => {
      const buffer = bufferCreator
        .int16("num1")
        .int16("num2")
        .int16("num3")
        .int16("num4")
        .bufferFrom({
          num1: 32767,
          num2: 32768,
          num3: 302341230,
          num4: 127,
        });

      expect(buffer.length).toBe(8);
      expect(buffer.readInt16LE()).toBe(32767);
      expect(buffer.readInt16LE(2)).toBe(0);
      expect(buffer.readInt16LE(4)).toBe(0);
      expect(buffer.readInt16LE(6)).toBe(127);
    });
  });
});
