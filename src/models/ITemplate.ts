export interface ITemplate {
  name: string;
  category: string;
  slug: string;
  tags: string[];
  TemplateImg: string;
  metadata: string;
  status: string;
  isShow: boolean;
  comment?: string;
  id: string;
}
