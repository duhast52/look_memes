export interface DefaultLazyResult {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: React.ComponentType<any>;
}
export type LazyComponentModel = Promise<DefaultLazyResult>;
