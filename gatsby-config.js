module.exports = {
  siteMetadata: {
    title: `Studio60.me`,
    description: `Studio60.me`,
  },
  plugins: [
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-csv`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `fonts`,
        path: `${__dirname}/src/fonts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
      },
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: 'studio60.me',
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Studio60.me`,
        short_name: `Studio60.me`,
        start_url: `/`,
        background_color: `#3566ab`,
        theme_color: `#3566ab`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
  ],
}
