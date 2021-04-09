const fsm = uni.getFileSystemManager();
const FILE_BASE_NAME = 'tmp_base64src'; //自定义文件名
 
function base64src(base64data, cb) {
  const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64data) || [];
  if (!format) {
    return (new Error('ERROR_BASE64SRC_PARSE'));
  }
  const filePath = `${uni.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${format}`;
  const buffer = uni.base64ToArrayBuffer(bodyData);
  fsm.writeFile({
    filePath,
    data: buffer,
    encoding: 'binary',
    success() {
      cb(filePath);
    },
    fail() {
      return (new Error('ERROR_BASE64SRC_WRITE'));
    },
  });
};
 
export { base64src };
