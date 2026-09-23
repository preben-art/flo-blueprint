export type DeskRole = "flo" | "kunde";
export type PostKind = "nyhet" | "artikkel";
export type PostStatus = "published" | "down";

export type DeskPost = {
  id: string;
  slug: string;
  kind: PostKind;
  title: string;
  kicker: string;
  excerpt: string;
  body: string[];
  still?: string;
  status: PostStatus;
  authorRole: DeskRole;
  authorName: string;
  authorId?: string;
  createdAt: string;
  updatedAt: string;
  source: "seed" | "desk";
};

export type DeskSession = {
  id: string;
  role: DeskRole;
  name: string;
};
