
import Component from "../components/0";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"cpu":{"user":120345,"system":23456},"memory":{"rss":24576000,"heapTotal":16777216,"heapUsed":9456123,"external":838860,"arrayBuffers":131072},"resource":{"fsRead":2048,"fsWrite":1024,"involuntaryContextSwitches":3,"ipcReceived":0,"ipcSent":0,"majorPageFault":2,"maxRSS":25000000,"minorPageFault":512,"sharedMemorySize":0,"signalsCount":1,"swappedOut":0,"systemCPUTime":30000,"userCPUTime":120000,"voluntaryContextSwitches":10,"unsharedDataSize":2345678,"unsharedStackSize":262144}};
}
