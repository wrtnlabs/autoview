
import Component from "../components/0";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"cpu":{"user":123456,"system":78901},"memory":{"rss":524288000,"heapTotal":157286400,"heapUsed":125829120,"external":10485760,"arrayBuffers":5242880},"resource":{"fsRead":2048,"fsWrite":1024,"involuntaryContextSwitches":12,"ipcReceived":0,"ipcSent":0,"majorPageFault":2,"maxRSS":524288000,"minorPageFault":350,"sharedMemorySize":0,"signalsCount":0,"swappedOut":0,"systemCPUTime":34567,"unsharedDataSize":262144000,"unsharedStackSize":5242880,"userCPUTime":123456,"voluntaryContextSwitches":30}};
}
