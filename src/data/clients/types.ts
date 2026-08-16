export interface GithubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
}

export interface BlogSummary {
  id: string;
  title: string;
  description: string;
  date: string;
  featured: boolean;
}

export interface BlogsIndexResponse {
  blogs: BlogSummary[];
}
