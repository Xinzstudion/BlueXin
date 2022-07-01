import NodeCache from "node-cache";
import Storage from "./Storage";
const threeHours = 60 * 60 * 3;

const Memory = () => {
  const cache = new NodeCache();

  const fetchKeys = (prefix: string): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      cache.keys((err, keys) => {
        if (err) {
          return reject(err);
        }
        return resolve(
          keys
            .filter((key) => key.startsWith(prefix))
            .map((key) => key.replace(prefix, ""))
        );
      });
    });
  };

  const set = (
    key: string,
    value: string,
    setOptions?: { noExpiration: boolean }
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (setOptions && setOptions.noExpiration) {
        cache.set(key, value, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      } else {
        cache.set(key, value, threeHours, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }
    });
  };

  const get = (key: string, resolveIfNoData?: boolean): Promise<string> => {
    return new Promise((resolve, reject) => {
      cache.get(key, (err, data) => {
        if (err) {
          reject(err);
        } else {
          if (!data && !resolveIfNoData) {
            reject(`Data unreconized -> ${key}`);
          } else {
            // @ts-ignore
            resolve(data);
          }
        }
      });
    });
  };

  const remove = (key: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      cache.del(key, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };

  return new Storage(get, set, remove, fetchKeys);
};

export default Memory;
