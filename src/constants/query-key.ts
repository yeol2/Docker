export const AUTH_QUERY_KEY = Object.freeze({
  TEAM_LIST: ['team-list'],
  REFRESH: ['refresh'],
});

export const USER_QUERY_KEY = Object.freeze({
  ATTENDANCE_STATE: ['attendance-state'],
  DASHBOARD: (teamId: number) => ['dashboard', teamId],
});

export const PROJECT_QUERY_KEY = Object.freeze({
  RANKED_PROJECTS: ['projects', 'rank'],
  CHECK_PROJECT_EXISTS: ['projects', 'existence'],
});

export const COMMENT_QUERY_KEY = Object.freeze({
  COMMENTS: (projectId: number) => ['comments', projectId],
});
