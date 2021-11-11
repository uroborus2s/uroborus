const t = () => {
  for (let i = 0; i < 1000; i++) {
    const r = Math.round(Math.random() * 20);
    if (r >= 20) console.log(r);
    if (r <= 0) console.log(r);
  }
};

if ([] && '') console.log('空');
