<!-- PROJECT LOGO -->
<br />
<div align="center">

  <a href="https://archive.runeterra.net/">
    <img src="https://user-images.githubusercontent.com/27760344/150653317-228e2254-102f-4443-ae2a-018952784742.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">League of Legends Boards Archive</h3>

  <p align="center">
    An archive of the League of Legends Boards, developed to preserve 6 years of user contributions
    <br />
    <a href="#"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://archive.runeterra.net/">View Demo</a>
    ·
    <a href="https://github.com/WuksGG/League-Community-Archive/issues">Report Bug</a>
    ·
    <a href="https://github.com/WuksGG/League-Community-Archive/issues">Request Feature</a>
  </p>
</div>

## About the Project

In early 2020, Riot Games announced it would no longer maintain the Boards and that the platform would be sunset two weeks after the announcement. This led to a mad dash to scrape and download as much of the Boards data as possible, which ultimately led to a large number of .json files housing the data for millions of users, comments, and threads across several regional platforms.

The League Boards Archive project aims to not only provide an interface for this raw data that allows for users to see the conversations between 2014 and 2020, but also to maintain an experience that is as true to form to the original League of Legends Boards.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

* [Next.js](https://nextjs.org/)
* [React.js](https://reactjs.org/)
* [Chakra UI](https://chakra-ui.com/)
* [Marked.js](https://marked.js.org/)
* [MongoDB](https://www.mongodb.com/)

### Supported & Planned Region Support
- [ ] Europe
- [ ] North America

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

### Prerequisites

* [Node.js v16+](https://nodejs.org/en/)
* [Redis v5.0+](https://redis.io/)
* [MongoDB 5.0](https://www.mongodb.com/docs/manual/release-notes/5.0/)

### Installation

1. Enter the app directory `cd boards-app` and install dependencies `yarn install`
2. Run the app in development mode using `yarn run dev`

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ## Running the Tests -->

<!-- ## Usage -->

<!-- ROADMAP -->
## Roadmap

- [ ] Build out the Homepage with a list of supported regions
- [ ] Build out the Categories page with a list of categories for that region
- [ ] Be able to render the list of discussions in that category with pagination
- [ ] Properly render discussions with
  - [ ] Discussion view (nested comments)
  - [ ] Chronological view (no nest, in order) 

See the [open issues](https://github.com/WuksGG/League-Community-Archive/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ## Contributing -->

## Versioning
We use [Semantic Versioning](https://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/WuksGG/League-Boards-Archive/tags).

<p align="right">(<a href="#top">back to top</a>)</p>

## Contact

Michael Chan - [WuksGG](https://github.com/WuksGG) - mchan@struxlab.com

Project Link: https://github.com/WuksGG/League-Community-Archive

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ## License -->

## Acknowledgments

* [othneildrew/Best-README-Template](https://github.com/othneildrew/Best-README-Template)
* [Axios](https://www.npmjs.com/package/axios)
* [React Timeago](https://www.npmjs.com/package/react-timeago), [timeago.js](https://timeago.org/)

<p align="right">(<a href="#top">back to top</a>)</p>
