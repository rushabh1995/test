// Cube configuration options: https://cube.dev/docs/config

// NOTE: third-party dependencies and the use of require(...) are disabled for
// CubeCloud users by default.  Please contact support if you need them
// enabled for your account.  You are still allowed to require
// @cubejs-backend/*-driver packages.

module.exports = {
  // Expected security contexts
  // https://cube.dev/docs/reference/configuration/config#scheduledrefreshcontexts
  scheduledRefreshContexts: () => ([
    { securityContext: { team: 'cx' } },
    { securityContext: { team: 'executive' } },
    { securityContext: { team: 'finance' } },
    { securityContext: { team: 'marketing' } }
  ]),

  // Mapping of security contexts to data model versions
  // https://cube.dev/docs/reference/configuration/config#contexttoappid
  contextToAppId: ({ securityContext }) => {
    return securityContext.team
  },

  // Security hook which is run before a query is executed
  // https://cube.dev/docs/reference/configuration/config#queryrewrite
  queryRewrite: (query, { securityContext }) => {
    if (!securityContext.team) {
      throw 'No team provided'
    }

    if (!['cx', 'executive', 'finance', 'marketing'].includes(securityContext.team)) {
      throw 'Unknown team: ' + securityContext.team
    }

    return query
  }
}
