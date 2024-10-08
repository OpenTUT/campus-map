import { glob } from "glob";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { z } from "zod";

const Children = z.object({
  name: z.string(),
  description: z.string(),
  url: z.string(),
  src: z.string(),
  room: z.string(),
  date: z.string(),
});

const GeoJSON = z.object({
  type: z.literal("Feature"),
  geometry: z.object({
    type: z.literal("Point"),
    coordinates: z.array(z.number()).length(2),
  }),
  properties: z.object({
    id: z.union([z.string(), z.number()]),
    name: z.string(),
    group: z.string(),
    children: z.array(Children),
  }),
});

const features = await Promise.all(
  (
    await glob(join(import.meta.dirname, "buildings/*.geojson"))
  ).map(async (path) => {
    const geojson = await readFile(path)
      .then((res) => res.toString())
      .then((res) => JSON.parse(res));
    return GeoJSON.parse(geojson);
  })
); /* .filter((feature) => feature.properties.children.length > 0); */

await writeFile(
  join(import.meta.dirname, "public/buildings.geojson"),
  JSON.stringify({
    type: "FeatureCollection",
    features,
  })
);
