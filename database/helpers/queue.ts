import { PathOrFileDescriptor } from 'fs';
import async from 'async';
import extractFile from './extract';
import transformAndLoad from './transformLoad';

// Will need to adjust implementation to handle
// race conditions within discussions if increased workers
const MAX_QUEUE_WORKERS = 5;
console.log(`Initializing queue with ${MAX_QUEUE_WORKERS}.`);

const queue = async.queue(async (filePath: PathOrFileDescriptor, callback) => {
  try {
    const parsedFile = await extractFile(filePath);
    await transformAndLoad(parsedFile);
    // if (parsedFile.discussion.comments.comments.length > 5) {
    //   process.stdout.write(`${filePath}\n`);
    // }
  } catch (e) {
    if (e instanceof Error) {
      process.stdout.write(`${e.message}\n`);
    }
  }
  callback();
}, MAX_QUEUE_WORKERS);

queue.drain(() => {
  process.stdout.write('All files processed.\n');
});

queue.error((err, task) => {
  process.stdout.write(`An error occurred with ${task}`);
});

export default queue;
