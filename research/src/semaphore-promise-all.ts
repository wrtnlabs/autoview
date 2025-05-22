/**
 * Executes an array of promises in a way that limits the number of concurrent tasks to a specified number.
 *
 * It is a version of `Promise.all`, but it allows you to control how many promises can be executed concurrently. It is useful if your task is rate-limited.
 *
 * @param promises - An array of functions that return promises.
 * @param concurrency - The maximum number of promises that can be executed concurrently.
 * @param delayBetweenConcurrentTasks - The delay in milliseconds between the completion of one concurrent task and the start of the next.
 * @returns A promise that resolves to an array of results from the promises.
 */
export async function semaphorePromiseAll<T>(
  promises: (() => Promise<T>)[],
  concurrency: number,
  delayBetweenConcurrentTasks: number,
): Promise<T[]> {
  if (promises.length <= concurrency) {
    return await Promise.all(promises.map((p) => p()));
  }

  let nextWorkerIndex = concurrency;
  const results: T[] = new Array(promises.length);

  async function worker(promiseIndex: number): Promise<void> {
    results[promiseIndex] = await promises[promiseIndex]();

    if (nextWorkerIndex === promises.length) {
      return;
    }

    const nextPromiseIndex = nextWorkerIndex;
    nextWorkerIndex += 1;

    await new Promise((resolve) =>
      setTimeout(resolve, delayBetweenConcurrentTasks),
    );

    return worker(nextPromiseIndex);
  }

  await Promise.all(
    new Array(concurrency).fill(0).map((_, index) => worker(index)),
  );

  return results;
}
