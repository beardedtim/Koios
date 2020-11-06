import path from "path";
import fs from "fs/promises";
import glob from "glob";
import yml from "js-yaml";
import R from "ramda";

import configToRoute from "./config-to-route.js";

import * as Router from "../router/index.js";

const is_relative_path = (f) => f.indexOf("/") !== 0;

const get_files_matching_pattern = (pattern) =>
  new Promise((res, rej) => {
    glob(pattern, function (err, files) {
      if (err) {
        rej(err);
      } else {
        res(files);
      }
    });
  });

const get_routes_from_path = async (dir_path, parentConfig) => {
  const route_paths = await get_files_matching_pattern(
    `${dir_path}/**/+(get|post|patch|put|del|head)/handler.js`
  );

  let config_paths = [];

  for (const route_path of route_paths) {
    const config_path = route_path.replace("handler.js", "config.yml");

    try {
      await fs.access(config_path);
      config_paths.push(config_path);
    } catch (e) {
      throw new Error(
        "You tried to give me a handler without a config at " + route_path
      );
    }
  }

  const configs = await Promise.all(
    config_paths.map((f) => fs.readFile(f, "utf8"))
  ).then((files) => files.map(yml.load));

  const routes = await Promise.all(
    route_paths.map(async (path) => [path, await import(path)])
  )
    .then((mods) => mods.map(([path, { default: d }]) => [path, d]))
    .then((mods) =>
      mods.map(([p, handler]) => {
        const route = path
          .resolve(p.replace(dir_path, "").replace("/handler.js", ""))
          .split("/");
        const method = route.pop();

        return { method, handler, path: route.join("/") };
      })
    );

  return routes.reduce((router, route, i) => {
    const config = configs[i];

    const merged_routes = R.mergeDeepLeft(config, parentConfig);

    return configToRoute(route, router, merged_routes);
  }, Router.create());
};

export default (fP, cP, config) => {
  let file_path = is_relative_path(fP)
    ? // If it is a relative path, we need
      // to ensure that we assume they meant
      // from the directory that they wrote
      // it in
      path.resolve(cP, "..", fP)
    : // If it is not relative, let's return
      // it as is
      fP;

  return get_routes_from_path(file_path, config);
};
