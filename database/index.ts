import fs from 'fs';
import 'dotenv/config';
import path from 'path';
import queue from './helpers/queue';
import prisma from './utils/dbClient';

const startEtl = async () => {
  const pathName = path.join(__dirname, 'files', 'na');
  const fileNames = fs.readdirSync(pathName);
  const filePaths = fileNames.map((fileName) => path.join(pathName, fileName));
  await prisma.riotPost.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.discussion.deleteMany();
  await prisma.user.deleteMany();
  await prisma.application.deleteMany();
  queue.push(filePaths, (err) => {
    if (err instanceof Error) process.stdout.write(`${err}\n`);
  });
  process.stdout.write('All files queued.\n');
};

startEtl();
