const questions = [
  {
    type: 'rawlist',
    name: 'selectedRegion',
    message: 'Select a region to target for ETL',
    choices: ['NA', 'EU', 'OCE'],
    filter(val: string) {
      return val.toLowerCase();
    },
  },
  {
    type: 'confirm',
    name: 'isStartConfirmed',
    message: 'Confirm ETL initialization?',
    default: false,
  },
];

export default questions;
