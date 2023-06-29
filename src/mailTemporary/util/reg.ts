const randomstring = require('randomstring');

export function keyStringRandomAddUnix(numberStr: number):string {
  const currentDate = new Date();
  const unixTime = Math.floor(currentDate.getTime() / 1000);
  const string = randomstring.generate(numberStr)
  return String(unixTime) + string;
}