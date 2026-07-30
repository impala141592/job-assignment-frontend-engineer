import { request } from "./client";
import type { Article } from "../types/article";

type ArticlesResponse = {
  articles: Article[];
  articlesCount: number;
};

type ArticleResponse = {
  article: Article;
};

export async function getArticles(): Promise<ArticlesResponse> {
  return request<ArticlesResponse>("/articles");
}

export async function getArticle(slug: string): Promise<ArticleResponse> {
  return request<ArticleResponse>(`/articles/${slug}`);
}

export async function getArticlesByAuthor(
  username: string
): Promise<ArticlesResponse> {
  return request<ArticlesResponse>(`/articles?author=${username}`);
}

export async function favoriteArticle(
  slug: string
): Promise<ArticleResponse> {
  return request<ArticleResponse>(`/articles/${slug}/favorite`, {
    method: "POST",
  });
}

export async function unfavoriteArticle(
  slug: string
): Promise<ArticleResponse> {
  return request<ArticleResponse>(`/articles/${slug}/favorite`, {
    method: "DELETE",
  });
}