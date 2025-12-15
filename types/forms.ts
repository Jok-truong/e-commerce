export type TokenFormData = {
  template: string;
  token: string;
  user_id: string;
};

export type BrandFormData = {
  _id?: string;
  name: string;
  slug: string;
  description?: string;
  image: string;
  status: "draft" | "publish" | "archive";
  user_id?: string | null | undefined;
  createdAt?: string;
};
