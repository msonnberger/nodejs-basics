import prompts from 'prompts';
import { writeFile } from 'fs/promises';
import { createHash } from 'crypto';

const res = await fetch('https://animechan.vercel.app/api/random');
const { quote } = await res.json();

console.log(quote);

const response = await prompts({
  type: 'text',
  name: 'shouldSave',
  message: 'Do you want to save this quote?',
});

if (response.shouldSave === 'yes') {
  const hash = createHash('md5').update(quote).digest('hex').substring(0, 9);
  await writeFile('quote-' + hash, quote);
  console.log('Quote saved!');
} else {
  console.log('Okay, bye!');
}
