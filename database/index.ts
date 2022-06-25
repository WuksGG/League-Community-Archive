import fs from 'fs';
import 'dotenv/config';
import path from 'path';
import inquirer from 'inquirer';
import queue from './helpers/queue';
import prisma from './utils/dbClient';

import questions from './entities/questions';

const startEtl = async () => {
  // const isActionConfirmed = await prompt('Are you sure you want to begin ETL?');

  const { isStartConfirmed, selectedRegion } = await inquirer.prompt(questions);
  if (!isStartConfirmed) return;

  // if (isActionConfirmed === 'n') return;
  const pathName = path.join(__dirname, 'files', selectedRegion);
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
