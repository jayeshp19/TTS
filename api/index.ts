const { VercelRequest, VercelResponse } = require('@vercel/node');
const data = require("./data");

const getRandomElement = <T>(arr: Array<T>): T =>
  arr[(Math.random() * arr.length) | 0];

export default (req: typeof VercelRequest, res: typeof VercelResponse) => {
  const { url } = req;

  if (url.endsWith('/ping')) {
    res.send('pong');
  } else if (url.endsWith('/content')) {
    const content = getRandomElement(data);
    res.json(content);
  } else {
    res.status(404).send('Not found');
  }
};
