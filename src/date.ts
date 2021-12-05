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

// localTimeSting();

console.log(
  JSON.parse(
    '{"choice_order":["choc693qnqvaa86kq823ih0","choc693qnqvaa86kq823ihg","choc693qnqvaa86kq823ii0"],"choices":{"choc693qnqvaa86kq823ih0":{"id":"choc693qnqvaa86kq823ih0","color":"#fcb400","name":"未开始"},"choc693qnqvaa86kq823ihg":{"id":"choc693qnqvaa86kq823ihg","color":"#338a17","name":"进行中"},"choc693qnqvaa86kq823ii0":{"id":"choc693qnqvaa86kq823ii0","color":"#444","name":"已完成"}},"enable_colors":false}',
  ),
);

console.log(
  new Intl.NumberFormat('zh-CN', { numberingSystem: 'arab' }).format(3500.2123),
);
console.log(
  new Intl.NumberFormat('zh-CN', { numberingSystem: 'arabext' }).format(3500),
);
console.log(
  new Intl.NumberFormat('zh-CN', { numberingSystem: 'bali' }).format(3500),
);
console.log(
  new Intl.NumberFormat('zh-CN', { numberingSystem: 'fullwide' }).format(3500),
);
console.log(
  new Intl.NumberFormat('zh-CN', { numberingSystem: 'hanidec' }).format(3500),
);
console.log(
  new Intl.NumberFormat('zh-CN', { numberingSystem: 'gujr' }).format(3500),
);
console.log(
  new Intl.NumberFormat('zh-CN', { numberingSystem: 'telu' }).format(3500),
);
console.log(
  new Intl.NumberFormat('zh-CN', { numberingSystem: 'orya' }).format(3500),
);
console.log(
  new Intl.NumberFormat('zh-CN', { numberingSystem: 'limb' }).format(3500),
);
console.log(
  new Intl.NumberFormat('zh-CN', { numberingSystem: 'latn' }).format(3500),
);
console.log(
  new Intl.NumberFormat('zh-CN', { numberingSystem: 'mong' }).format(3500),
);
