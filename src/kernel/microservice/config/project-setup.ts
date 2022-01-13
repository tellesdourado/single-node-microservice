interface Component {
  [componentName: string]: unknown;
}

export class ProjectSetup {
  private static components: Component = {};
  constructor() {}
  public static register(name: string, cls: unknown) {
    this.components[name] = cls;
  }

  public static retrieve<T>(name: string) {
    return this.components[name] as T;
  }
}
