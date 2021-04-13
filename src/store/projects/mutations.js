export function setProject (state, project) {
  state.project = project
}

export function setProjects (state, projects) {
  state.projects = projects
}

export function setStreamProject (state, streamProject) {
  state.stream_project = streamProject
}

export function subsSuccess (state, sub) {
  state.sub_success = sub
}

export function setProjectSubscriptionPageData (state, data) {
  state.project_subscription_page_data = data
}

export function setPageVisitsOfProject (state, pageVisitsOfProject) {
  state.page_visits_of_project = pageVisitsOfProject
}

export function setPageVisitsOfProjectMeta (state, meta) {
  state.page_visits_of_project_meta = meta
}

export function setTagEventsOfProject (state, tagEventsOfProject) {
  state.tag_events_of_project = tagEventsOfProject
}

export function setTagEventsOfProjectMeta (state, meta) {
  state.tag_events_of_project_meta = meta
}

export function setProjectAudiences (state, projectAudiences) {
  state.project_audiences = projectAudiences
}

export function setProjectsMeta (state, meta) {
  state.projects_meta = meta
}

export function setSaving (state, value) {
  state.saving = value
}

export function setFetching (state, value) {
  state.fetching = value
}
