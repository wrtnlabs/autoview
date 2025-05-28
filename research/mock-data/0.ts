
import Component from "../components/0";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"cpu":{"user":120345,"system":34567},"memory":{"rss":536870912,"heapTotal":157286400,"heapUsed":125829120,"external":20971520,"arrayBuffers":5242880},"resource":{"fsRead":1024,"fsWrite":2048,"involuntaryContextSwitches":15,"ipcReceived":10,"ipcSent":8,"majorPageFault":2,"maxRSS":629145600,"minorPageFault":120,"sharedMemorySize":5242880,"signalsCount":20,"swappedOut":0,"systemCPUTime":5678,"unsharedDataSize":104857600,"unsharedStackSize":2097152,"userCPUTime":12345,"voluntaryContextSwitches":200}};
}
