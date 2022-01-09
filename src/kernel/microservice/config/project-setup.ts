interface Component {
  [componentName: string]: unknown;
}

export class ProjectSetup {
  private static components: Component = {};

  private constructor() {}

  public static register(name: string, cls: unknown) {
    this.components[name] = cls;
  }

  public static find<T>(name: string) {
    return this.components[name] as T;
  }
}
