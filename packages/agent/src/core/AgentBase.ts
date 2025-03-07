export interface AgentBase<In, Out> {
  execute(input: In): Promise<Out>;
}
