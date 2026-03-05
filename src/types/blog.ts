export interface BlogPost {
    id: string;
    created_at: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    image_url: string;
    published: boolean;
    author_id: string;
    tags?: string[];
}

export interface BlogPostInput {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    image_url: string;
    published: boolean;
    tags?: string[];
}
