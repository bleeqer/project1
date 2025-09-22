import {expect, test} from '@jest/globals';
import {opendir} from "node:fs/promises";

test('파일 읽기 테스트', async () => {
    const dir = await opendir("./");
    try {
        for await (const dirent of dir)
            console.log(dirent.name)
    } catch (err) {
        console.log(err);
    }
});