function localTimeSting() {
  const date = new Date();
  console.log(date);
  console.log(date.getDate());
  console.log(date.toLocaleDateString()); //2021/12/2
  console.log(date.toLocaleTimeString()); //下午9.31
  console.log(date.toDateString()); //thu dec 02 2021
  console.log(date.toISOString()); //2021-12-02T12:31:08 602Z
  console.log(date.toUTCString()); //2021-12-02T12:31:08 GMT
  console.log(date.toString()); //2021-12-02T12:31:08 GMT +0800 (中国标准时间)
  console.log(date.toTimeString());
}

localTimeSting();
