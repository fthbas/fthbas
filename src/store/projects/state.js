export default function () {
  return {
    projects: null,
    stream_project: null,
    project: null,
    project_subscription_page_data: null,
    sub_success: 'none',
    project_audiences: null,
    page_visits_of_project: null,
    page_visits_of_project_meta: { count: 0 },
    tag_events_of_project: null,
    tag_events_of_project_meta: { count: 0 },
    saving: false,
    fetching: false,
    projects_meta: { count: 0 }
  }
}
