import { AES, enc } from "crypto-js";

const key = "recoil";
const secret = "recoil";

const dataEncryptionConfig = {
  key: key,
  storage: sessionStorage,
  converter: {
    stringify: (data: ANGLE_instanced_arrays) => {
      const stringifiedData = JSON.stringify(data);
      const encryptedData = AES.encrypt(stringifiedData, secret).toString();
      return encryptedData;
    },
    parse: (encryptedData: string) => {
      const bytes = AES.decrypt(encryptedData, secret);
      const parsedData = JSON.parse(bytes.toString(enc.Utf8));
      return parsedData;
    },
  },
};

export { dataEncryptionConfig };
