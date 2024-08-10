export interface TeamConfig {
    left: string,
    right: string
}

export const STATIC_TEAMNAMES: Promise<TeamConfig> = fetch(`/kisc_static/current_team.json`).then((_) =>
	_.json()
);
