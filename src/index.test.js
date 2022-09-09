const {stringHelper, base64Helper} = require('./libs');
const fs = require("fs");


test('string is null or empty', () => {
    expect(stringHelper.isNullOrEmpty(null)).toBeTruthy();
    expect(stringHelper.isNullOrEmpty('')).toBeTruthy();
    expect(stringHelper.isNullOrEmpty(undefined)).toBeTruthy();

    expect(stringHelper.isNullOrEmpty(' ')).toBeTruthy();
    expect(stringHelper.isNullOrEmpty(' sd sadf')).toBeFalsy();
})

test('string is base64 string', () => {
    expect(base64Helper.isBase64String(null)).toBeFalsy();
    expect(base64Helper.isBase64String('')).toBeFalsy();
    expect(base64Helper.isBase64String(undefined)).toBeFalsy();
    expect(base64Helper.isBase64String(' ')).toBeFalsy();
    expect(base64Helper.isBase64String(' sd sadf')).toBeFalsy();
    expect(base64Helper.isBase64String('data:image/png;base64,')).toBeFalsy();
    expect(base64Helper.isBase64String('data:image/png;base64, sd sadf')).toBeFalsy();
    expect(base64Helper.isBase64String('dfasdfr342')).toBeFalsy();
    expect(base64Helper.isBase64String('afQ$%rfew')).toBeFalsy();
    expect(base64Helper.isBase64String('1342234')).toBeFalsy();
    expect(base64Helper.isBase64String(1342234)).toBeFalsy();
    expect(base64Helper.isBase64String('data:image/png;base64,uuLMhh==')).toBeFalsy();
    expect(base64Helper.isBase64String('/ere/erer/r.jpg')).toBeFalsy();

    expect(base64Helper.isBase64String('dGVzdCBzdHJpbmc=')).toBeTruthy();
    expect(base64Helper.isBase64String(
        '/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEACAhITMkM1EwMFFCLy8vQiccHBwcJyIXFxcXFyIRDAwMDAwMEQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwBIjMzNCY0IhgYIhQODg4UFA4ODg4UEQwMDAwMEREMDAwMDAwRDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIAAYABgMBIgACEQEDEQH/xABVAAEBAAAAAAAAAAAAAAAAAAAAAxAAAQQCAwEAAAAAAAAAAAAAAgABAxQEIxIkMxMBAQAAAAAAAAAAAAAAAAAAAAARAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AIE7MwkbOUJDJWx+ZjXATitx2/h2bEWvX5Y0npQ7aIiD/9k='
    )).toBeTruthy();
})

test('string is base64 file', () => {
    expect(base64Helper.isBase64File(null)).toBeFalsy();
    expect(base64Helper.isBase64File('')).toBeFalsy();
    expect(base64Helper.isBase64File(undefined)).toBeFalsy();
    expect(base64Helper.isBase64File(' ')).toBeFalsy();
    expect(base64Helper.isBase64File(' sd sadf')).toBeFalsy();
    expect(base64Helper.isBase64File('dfasdfr342')).toBeFalsy();
    expect(base64Helper.isBase64File('afQ$%rfew')).toBeFalsy();
    expect(base64Helper.isBase64File('1342234')).toBeFalsy();
    expect(base64Helper.isBase64File(1342234)).toBeFalsy();
    expect(base64Helper.isBase64File(
        '/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEACAhITMkM1EwMFFCLy8vQiccHBwcJyIXFxcXFyIRDAwMDAwMEQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwBIjMzNCY0IhgYIhQODg4UFA4ODg4UEQwMDAwMEREMDAwMDAwRDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIAAYABgMBIgACEQEDEQH/xABVAAEBAAAAAAAAAAAAAAAAAAAAAxAAAQQCAwEAAAAAAAAAAAAAAgABAxQEIxIkMxMBAQAAAAAAAAAAAAAAAAAAAAARAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AIE7MwkbOUJDJWx+ZjXATitx2/h2bEWvX5Y0npQ7aIiD/9k='
    )).toBeFalsy();

    expect(base64Helper.isBase64File('data:image/png;base64,uuLMhh==')).toBeTruthy();
    expect(base64Helper.isBase64File('data:image/png;base64,dGVzdCBzdHJpbmc=')).toBeTruthy();
    expect(base64Helper.isBase64File(
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEACAhITMkM1EwMFFCLy8vQiccHBwcJyIXFxcXFyIRDAwMDAwMEQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwBIjMzNCY0IhgYIhQODg4UFA4ODg4UEQwMDAwMEREMDAwMDAwRDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIAAYABgMBIgACEQEDEQH/xABVAAEBAAAAAAAAAAAAAAAAAAAAAxAAAQQCAwEAAAAAAAAAAAAAAgABAxQEIxIkMxMBAQAAAAAAAAAAAAAAAAAAAAARAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AIE7MwkbOUJDJWx+ZjXATitx2/h2bEWvX5Y0npQ7aIiD/9k='
    )).toBeTruthy();

})
test('string to base64 file', () => {
    expect(() => base64Helper.stringToBase64File(null)).toThrow(TypeError)
    expect(base64Helper.stringToBase64File('uuLMhh==', 'image/png')).toEqual('data:image/png;base64,uuLMhh==');
    expect(base64Helper.stringToBase64File('test string', 'image/png')).toEqual('data:image/png;base64,dGVzdCBzdHJpbmc=');

})
test('string to base64', () => {
    expect(() => base64Helper.stringToBase64(null)).toThrow(TypeError)
    expect(base64Helper.stringToBase64('test string')).toEqual('dGVzdCBzdHJpbmc=');

})
test('string to base64', () => {
    expect(() => base64Helper.base64ToString(null)).toThrow(TypeError)
    expect(() => base64Helper.base64ToString('test string')).toThrow(TypeError)
    expect(() => base64Helper.base64ToString('data:image/png;base64,uuLMhh==')).toThrow(TypeError)
    expect(base64Helper.base64ToString('dGVzdCBzdHJpbmc=')).toEqual('test string')

})
test('base64 to buffer', () => {
    expect(() => base64Helper.base64ToBuffer(null)).toThrow(TypeError)
    expect(() => base64Helper.base64ToBuffer('test string')).toThrow(TypeError)
    expect(() => base64Helper.base64ToBuffer('dGVzdCBzdHJpbmc=')).toThrow(TypeError)
    expect(typeof base64Helper.base64ToBuffer('data:image/png;base64,uuLMhh==')).toEqual('object')

})
test('save base64 to file sync', () => {
    const imageBase64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEACAhITMkM1EwMFFCLy8vQiccHBwcJyIXFxcXFyIRDAwMDAwMEQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwBIjMzNCY0IhgYIhQODg4UFA4ODg4UEQwMDAwMEREMDAwMDAwRDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIAAYABgMBIgACEQEDEQH/xABVAAEBAAAAAAAAAAAAAAAAAAAAAxAAAQQCAwEAAAAAAAAAAAAAAgABAxQEIxIkMxMBAQAAAAAAAAAAAAAAAAAAAAARAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AIE7MwkbOUJDJWx+ZjXATitx2/h2bEWvX5Y0npQ7aIiD/9k='
    const imagePath = __dirname + '/test/files/test.jpg'
    expect(() => base64Helper.saveBase64ToFileSync(null, 'test.jpg')).toThrow(TypeError)
    if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath)
    }
    let filePath = base64Helper.saveBase64ToFileSync(imageBase64, imagePath)
    expect(filePath).toEqual(imagePath)

})
test('save base64 to file async', async () => {
    const imageBase64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEACAhITMkM1EwMFFCLy8vQiccHBwcJyIXFxcXFyIRDAwMDAwMEQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwBIjMzNCY0IhgYIhQODg4UFA4ODg4UEQwMDAwMEREMDAwMDAwRDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIAAYABgMBIgACEQEDEQH/xABVAAEBAAAAAAAAAAAAAAAAAAAAAxAAAQQCAwEAAAAAAAAAAAAAAgABAxQEIxIkMxMBAQAAAAAAAAAAAAAAAAAAAAARAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AIE7MwkbOUJDJWx+ZjXATitx2/h2bEWvX5Y0npQ7aIiD/9k='
    const imagePath = __dirname + '/test/files/test1.jpg'
    if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath)
    }
    let filePath = await base64Helper.saveBase64ToFile(imageBase64, imagePath)
    expect(filePath).toEqual(imagePath)

})
