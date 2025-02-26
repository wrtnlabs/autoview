export interface Agent<In, Out> {
  execute(input: In): Promise<Out>;
}
