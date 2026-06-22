import type { SiteEvent } from "@/lib/dataStore";

export type DbEventLevel = "national" | "state";

export type DbEvent = {
  _id: string;
  day: string;
  month: string;
  year: string;
  title: string;
  place: string;
  time: string;
  detail: string;
  level: DbEventLevel;
  image?: string;
};

export function toSiteEvent(db: DbEvent): SiteEvent {
  return {
    id: db._id,
    day: db.day,
    month: db.month,
    year: db.year,
    title: db.title,
    place: db.place,
    time: db.time,
    detail: db.detail,
    level: db.level,
    image: db.image,
  };
}

