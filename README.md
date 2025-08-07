# Gov Data Dashboard | Typescript

_This repository is a basis for the technical deep dive interview and not actively updated. Please note that the code intentionally includes problems._

[GovData.de](https://www.govdata.de/) is the data portal for Germany. The federal, state and local governments can share their data. Although the "Open Data Act" makes it obligatory to share data, only about 135,000 data sets are online so far.

This repository contains a small web application that provides a dashboard showing how many data sets each federal ministry has made available on GovData. The goal of the dashboard is to show which ministries have provided the most data. States, municipalities and other institutions are ignored.

## Implementation

The GovData's [CKAN Action API](https://www.govdata.de/ckan/api/3) ([documentation](https://docs.ckan.org/en/2.9/api/index.html#get-able-api-functions)) was used to retrieve the data. The file `departments.json` lists all federal ministries and their subordinated agencies that have published data on GovData.

## Requirements

- Node v18 (may work on older versions, but has not been tested)

Install all dependencies

```
npm install
```

## How to run

You can run the application on http://localhost:8080.

```
npm start
```

### Development

If you want to use a watcher during development, you can use:

```
 npm run watch:start
```

### How to test

- Execute `npm test`
- A watcher is available via `npm run watch:test`

### Linting, Formatting

- Run `npm run lint` to run check for linting
- Run `npm run lint:fix` to fix linting errors (where possible)

- Run `npm run prettier:check` to check formatting
- Run `npm run prettier:write` to fix formatting (where possible).
