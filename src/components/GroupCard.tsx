import React from "react";
import { IconWorld, IconMapPin, IconClock, IconX } from "@tabler/icons-react";
import { Children } from "./Children";
import classes from "./GroupCard.module.css";

type GroupCardProps = {
  group: Children | undefined;
  setGroup: (group: Children | undefined) => void;
};

const GroupCard: React.FC<GroupCardProps> = ({ group, setGroup }) => {
  if (!group) return null;

  return (
    <div
      style={{
        maxWidth: "800px",
        height: "100%",
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: "1rem 1rem 0 0",
        padding: "0",
        margin: "0 auto",
        border: "solid 1px #aaa",
        position: "relative",
      }}
    >
      <div
        style={{
          overflow: "auto",
          height: "100%",
          width: "100%",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "50%",
          }}
        >
          <img
            src={group.src}
            alt={group.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "1rem 1rem 0 0",
            }}
          />
        </div>
        <div style={{ padding: "1rem" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              margin: 0,
              color: "#333",
            }}
          >
            {group.name}
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "#333",
              margin: "auto",
              display: "flex",
              justifyContent: "flex-end",
              textAlign: "left",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <IconWorld strokeWidth={2} />
              <a
                href={group.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "1rem",
                  color: "#1D4ED8",
                  textDecoration: "none",
                  wordBreak: "break-all",
                }}
              >
                {group.url.length > 25
                  ? `${group.url.slice(0, 25)}...`
                  : group.url}
              </a>
            </span>
            <span className={classes.mobileBreak} />
            <span style={{ display: "flex", alignItems: "center" }}>
              <IconMapPin strokeWidth={2} />
              {group.room}
            </span>
            <span style={{ display: "flex", alignItems: "center" }}>
              <IconClock strokeWidth={2} />
              {group.date}
            </span>
          </p>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#666",
              marginTop: "1rem",
            }}
          >
            {group.description}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          setGroup(undefined);
        }}
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          padding: "0.5rem", // p-2
          backgroundColor: "#ef4444", // bg-red-500
          color: "#ffffff", // text-white
          borderRadius: "0.25rem", // rounded
        }}
      >
        <IconX size={"1rem"} strokeWidth={2} color={"black"} />
      </button>
    </div>
  );
};

export default GroupCard;
