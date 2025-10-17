"use client";

import { Avatar, Box, Link as MuiLink, Stack, Typography } from "@mui/material";
import { profile } from "@/content/profile";
import { FaGlobe, FaInstagram, FaLinkedin } from "react-icons/fa";
import { JSX } from "react";

interface Props {
  name?: string;
  role?: string;
  bio?: string;
  avatar?: string;
  socials?: typeof profile.socials;
  location?: string;
  variants?: "simple" | "full";
}

export function AboutAuthor({
  name,
  role,
  bio,
  avatar,
  socials,
  location,
  variants = "simple",
}: Props) {
  if (!name) return null;

  const iconMap: Record<string, JSX.Element> = {
    instagram: <FaInstagram size={16} />,
    linkedin: <FaLinkedin size={16} />,
    website: <FaGlobe size={16} />,
  };

  const topSocials = socials ? Object.entries(socials).slice(0, 3) : [];

  return (
    <Box
      className={`flex flex-col items-start p-4 bg-background rounded-xl shadow-md gap-4 border border-border ${variants === "simple" ? "" : "xl:flex-row"}`}
    >
      <Avatar
        src={avatar}
        alt={name}
        sx={{
          width: variants === "simple" ? 64 : 148,
          height: variants === "simple" ? 64 : 148,
        }}
        className={`${variants === "simple" ? "" : "mx-auto xl:mx-0"}`}
      />
      <div className="flex flex-col gap-1">
        <Typography variant="h6" className="font-semibold">
          {name}
        </Typography>
        {role && (
          <Typography variant="body2" color="text.secondary">
            {role} {location ? `• ${location}` : ""}
          </Typography>
        )}
        {bio && (
          <Typography
            variant="body2"
            color="text.secondary"
            className={`mt-1 ${variants === "simple" ? "" : "w-[90%]"}`}
          >
            {bio}
          </Typography>
        )}

        {topSocials.length > 0 && (
          <Stack direction="column" spacing={2} className="mt-2 flex-wrap">
            {topSocials.map(([key, s]) => (
              <MuiLink
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                className="flex items-center gap-1 text-sm font-medium"
              >
                {iconMap[key] ?? null}
                {s.label}
              </MuiLink>
            ))}
          </Stack>
        )}
      </div>
    </Box>
  );
}
