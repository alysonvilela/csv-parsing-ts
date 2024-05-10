
# Stream CSV TS - Perform study
This project is a study case for method of reading lines using ReadableStreams on Nodejs.

The purpose is verify what is the performant way to process data and migrate them to database or external services.
I decided to use RxJS because the methods provided simplify the hole code to make the experiment happen.

The results of this experiment has been adapted to a real use case and it's currently running in production for a banking service that I'm working on.

## Hypotesis
1. Process line chunk -> each case make an request/db insert -> 
2. Process line chunk -> set an amount of data into a queue -> make a bulk insertion

For both Hypotesis should check the time spent between process and deliver the last data.

## Tech used
- Node 21
- RxJs 7
- Vitest
- TypeScript
- Fast-CSV

## Running locally
1. Clone the project and enter on the directory
2. Install the dependencies

```bash
  npm install // or `pnpm install`
```

3. Start testing
```bash
  npm run test
```

## Results
PICTURE HYPOTESIS 

## Author
- [@alysonvilela](https://www.github.com/alysonvilela)

