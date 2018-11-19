import '@/scss/main.scss';

const asd3 = '';

let asd = {};

asd = { ...asd, foo: 'bar' };

asd = {
  foo2: 'bar',
};

console.log(asd);

const asd2 = err => {
  console.log(
    err +
      'asdadasjkdjaldlasjdlkajslkdjaslkdjlkasjdlasjdlajsldkjalsjdlasjdlkajsdlkjaslkdjlaskjdlkasjdlkasjdlkajsldkjaslkdjlaksjdlkasjdlkjas'
  );
};

asd2('asd');

var o = {
  p: 42,
  q: true,
};

var { p, q } = o;

asd2(p + q);
